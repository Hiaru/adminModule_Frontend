<template>
    <Loader v-if="isLoading" class="my-auto mx-auto"/>
    <div class="container rounded mx-auto">
        <DataTable
            :data="table.users"
            :columns="columns"
            :options="{
                pagingType: 'full_numbers',
                stateSave: true,
                bSelect: true,
                select: true,
                language: {
                    searchPlaceholder: '',
                    sSearch: '<h5> Buscar: </h5>',
                    sLengthMenu: '<h5> Mostrar </h5> _MENU_',
                    sInfo: '<span> Mostrando </span> _START_ <span> a </span> _END_ <span> de </span> _TOTAL_ <span> registros </span>'
                },
                drawCallback: function() {
                    refreshButtons(); // CALL TO GET BUTTONS FOR DATATABLE
                }
            }"
                id="usersTable"
                class="table table-striped table-bordered display"
        ></DataTable>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted, onBeforeMount, reactive, defineEmits, onUpdated } from 'vue';
    import Loader from '@/components/animated/Loader.vue'

    /**
     * IMPORT JQUERY
     */
    import $ from 'jquery';

    /**
     * IMPORT FUNCTION TO SEND REQUEST
     */
    import { sendRequest } from '@/utils/requests';

    /**
     * IMPORT ALERTS
     */
    import { showAlert, showConfirmation } from '@/utils/alerts';

    /**
     * IMPORT DATATABLE JS
     */
    import DataTable from "datatables.net-vue3";
    import DataTableLib from "datatables.net-bs5";

    /**
     * INSTANCE DATATABLE
     */
    DataTable.use(DataTableLib);
    const datatable = $('#usersTable').DataTable();

    /**
     * INSTANCE LOADER
     */
    const isLoading = ref(false);

    /**
     * DATA FOR DATATABLE
     */ 
    const table = reactive({
        users: ref([])
    })

    /**
     * SELECTORS
     */
    const selectors = reactive({
        roles: ref({})
    })

    /**
     * COLUMNS FOR DATATABLE
     */
    const columns = [
        {
            data: "id",
            title: "ID"
        },
        {
            data: "username",
            title: "usuario"
        },
        {
            data: "name",
            title: "Nombres"
        },
        {
            data: "lastname",
            title: "Apellidos"
        },
        {
            data: null,
            title: "Acciones",
            render: (data) => {
                let message = '<button type="button" class="btn btn-info view-user" row="' + data.id + '" act="view">View</button>'
                message += '<button type="button" class="btn btn-warning edit-user" row="' + data.id + '" act="edit">Edit</button>'

                if (data.accAuthorized) {
                    message += '<button type="button" class="btn btn-danger change-user" row="' + data.id + '" act="change">Disable</button>'
                } else {
                    message += '<button type="button" class="btn btn-success change-user" row="' + data.id + '" act="change">Enable</button>'
                }

                return message;
            }
        }
    ]

    /**
     * OBTAIN DATA FROM PARENT COMPONENT
     */
    const parentData = ref(null);

    /**
     * FUNCTION TO HANDLE UPDATES FROM PARENT COMPONENT
     */
    const handleUpdateInfo = async (newInfo) => {
        /**
         * SET THE DATA OBTAINED
         */
        parentData.value = await newInfo

        /**
         * FLUSH TABLE 
         */
        table.users = [];

        /**
         * TURN ON LOADER
         */
        isLoading.value = true

        /**
         * TODO: GET DATA ABOUT USERS
         */
        try {
            /**
             * GET DATA FROM BE
             */
            const response = await sendRequest('post', 'api/get_all_users_with_roles', {database_id: parentData.value})

            /**
             * VERIFY IF REQUEST WAS SUCCESSFUL
             */
             if(response.status){
                /**
                 * SET DATA IN TABLE
                 */
                table.users = await response.data

                console.log("users table: ", table.users)
             }
        } catch (error) {
            
        }
        /**
         * TURN OFF LOADER
         */
        isLoading.value = false;
    };

    /**
     * EXPOSE THE FUNCTION IN CHILD COMPONENT TO USE IN PARENT COMPONENT
     */ 
    defineExpose({ handleUpdateInfo })

    /**
     * ADD EVENT LISTENER FOR ALL VIEW/EDIT/DISABLE/ENABLE BUTTONS LOADED ON DATATABLE
     */
    const refreshButtons = async () => {
        /**
         * FOR VIEW BUTTONS
         */
        const viewButtons = document.querySelectorAll(".btn")
        viewButtons.forEach((viewButton) => {
            viewButton.addEventListener("click", actionsToDo)
        })

        /**
         * FOR EDIT BUTTONS
         */
        const editButtons = document.querySelectorAll("edit-user")
        editButtons.forEach((editButton) => {
            editButton.addEventListener("click", actionsToDo)
        })

        /**
         * FOR DISABLE/ENABLE BUTTONS
         */
        const changeButtons = document.querySelectorAll(".change-user")
        changeButtons.forEach((changeButton) => {
            changeButton.addEventListener("click", actionsToDo)
        })
    }

    /**
     * @actionsToDo
     * 
     * EVENT LISTENER FOR ALL VIEW/EDIT/DISABLE/ENABLE BUTTONS LOADED ON DATATABLE
     * 
     * @param {event} row 
     * @returns {json} -> RETURNS AN OBJECT WITH DATA FROM SELECTORS
     */
    async function actionsToDo(event) {
        /**
         * GET TYPE OF ACTION AND ID FROM THE EVENT
         */
        let action = event.target.getAttribute('act')
        let idEvent = event.target.getAttribute('row')

        /**
         * INSTANCE SELECTED USER
         */
        let selectedUser = null

        /**
         * SWITCH CASE FOR ANY TYPE OF ACTION
         */
        switch (action){
            case 'view':
                /**
                 * GET DATA FROM BE
                 */
                const responseView = await sendRequest('post', 'api/get_all_roles', {database_id: parentData.value})
                selectors.roles = await responseView.data

                /**
                 * GET USER BY ID
                 */
                table.users.forEach(user => {
                    if(user.id == idEvent){
                        selectedUser = user
                    }   
                });

                /**
                 * OPEN MODAL TO VIEW DATA 
                 */
                openUserModal({
                    action: 'view',
                    database_id: parentData.value,
                    user: selectedUser,
                    data: selectors.roles,
                });
            break;

            case 'edit':
                /**
                 * GET DATA FROM BE
                 */
                const responseEdit = await sendRequest('post', 'api/get_all_roles', {database_id: parentData.value})
                selectors.roles = await responseEdit.data

                /**
                 * GET USER BY ID
                 */
                table.users.forEach(user => {
                    if(user.id == idEvent){
                        selectedUser = user
                    }   
                });

                /**
                 * OPEN MODAL TO VIEW DATA 
                 */
                openUserModal({
                    action: 'edit',
                    database_id: parentData.value,
                    user: selectedUser,
                    data: selectors.roles,
                });
            break;

            case 'change':
                /**
                 * REQUEST CHANGE TO USER
                 */
                const response  = await showConfirmation("Autorización", "warning", "¿Estas seguro de realizar esta acción?")

                /**
                 * IF RESPONSE IS TRUE SEND DATA TO BE
                 */
                if(response){
                    console.log("user id: ", idEvent)
                    const responseChange = await sendRequest('post', 'api/update_user_status', {user_id: idEvent, database_id: parentData.value})

                    /**
                     * GET RESPONSE
                     */
                    if(responseChange != null && responseChange.status){
                        showAlert('Éxito', 'success', 'Usuario actualizado exitosamente')  
                    }

                    /**
                     * TURN OFF LOADER
                     */
                    isLoading.value = false

                    /**
                     * RESET DATA TABLE FOR USERS REGISTERS
                     */
                    setTimeout(() =>{
                        location.reload()
                    }, 1300)
                }
            break;
        }
    }

    /**
     * EMIT FOR OPEN MODAL USER
     */
    const emit = defineEmits(['open-user-modal'])

    /**
     * FUNCTION TO OPEN MODAL
     */
    const openUserModal = (data) => {
        emit('open-user-modal', data)
    }
</script>