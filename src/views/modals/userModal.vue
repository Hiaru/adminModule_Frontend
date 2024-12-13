<template>
    <Loader v-if="isLoading" class="my-auto mx-auto"/>
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <form class="row g-2 mt-2" ref="infoUser" @submit.prevent="onSubmitUser">
                <div class="modal-content">
                    <div>
                        <div class="modal-header">
                            <h4 class="modal-title" id="userModalTitle">GESTIONAR USUARIO</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="filter: invert(0.5) sepia(1) turate(5) hue-rotate(175deg);"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container rounded mx-auto bg-ligth">
                                <div class="row mt-3">
                                    <!-- INPUT NAME -->
                                    <div class="col-6">
                                        <!-- LOADER -->
                                        <div v-if="isLoading">
                                            <AnimatedPlaceholder height="100%" width="100%" borderRadius="5%" />
                                        </div>
                                        <!-- INPUT -->
                                        <div v-else>
                                            <label for="name" class="form-label">Nombre</label>
                                            <input type="text" disabled class="form-control" id="name" v-model="inputs.name">
                                        </div>
                                    </div>
                                    <!-- INPUT LASTNAME -->
                                    <div class="col-6">
                                        <!-- LOADER -->
                                        <div v-if="isLoading">
                                            <AnimatedPlaceholder height="100%" width="100%" borderRadius="5%" />
                                        </div>
                                        <!-- INPUT -->
                                        <div v-else>
                                            <label for="lastname" class="form-label">Apellido</label>
                                            <input type="text" disabled class="form-control" id="lastname" v-model="inputs.lastname">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <!-- INPUT USERNAME -->
                                    <div class="col-6">
                                        <!-- LOADER -->
                                        <div v-if="isLoading">
                                            <AnimatedPlaceholder height="100%" width="100%" borderRadius="5%" />
                                        </div>
                                        <!-- INPUT -->
                                        <div v-else>
                                            <label for="username" class="form-label">Usuario de red</label>
                                            <input type="text" disabled class="form-control" id="username" v-model="inputs.username">
                                        </div>
                                    </div>
                                    <!-- INPUT PCC -->
                                    <div class="col-6">
                                        <!-- LOADER -->
                                        <div v-if="isLoading">
                                            <AnimatedPlaceholder height="100%" width="100%" borderRadius="5%" />
                                        </div>
                                        <!-- INPUT -->
                                        <div v-else>
                                            <label for="pcc" class="form-label">P00</label>
                                            <input type="text" disabled class="form-control" id="pcc" v-model="inputs.pcc">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <!-- INPUT UNIT -->
                                    <div class="col-12">
                                         <!-- LOADER -->
                                        <div v-if="isLoading">
                                            <AnimatedPlaceholder height="100%" width="100%" borderRadius="5%" />
                                        </div>
                                        <!-- INPUT -->
                                        <div v-else>
                                            <label for="unit" class="form-label">P00</label>
                                            <input type="text" disabled class="form-control" id="unit" v-model="inputs.unit">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <!-- INPUT ROLE -->
                                    <div class="col-12">
                                         <!-- LOADER -->
                                        <div v-if="isLoading">
                                            <AnimatedPlaceholder height="100%" width="100%" borderRadius="5%" />
                                        </div>
                                        <!-- INPUT -->
                                        <div v-else>
                                            <div class="form-floating">
                                                <select class="form-select" id="role_id" v-model="inputs.role_id" :disabled="inputsError.role_id.status">
                                                    <option v-for="role in selectors.roles" :value="role.id" :key="role.id">
                                                        {{ role.memo }}
                                                    </option>
                                                </select>
                                                <label for="role_id" class="form-label">Rol del usuario</label>
                                            </div>
                                            <p class="error_input_message fw-semibold ml-1 text-danger" v-bind:disabled="inputsError.role_id.error" v-text="inputsError.role_id.message" id="error_input_message" name="error_input_message"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <!-- BUTTON -->
                            <div class="row mb-2">
                                <div class="col-12">
                                    <div v-if="isLoading" style="width: 14rem;">
                                        <AnimatedPlaceholder height="100%" width="100%" borderRadius="5%" style="margin-top: 4%;"/>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-success btn-lg" type="submit" ref="editRolesUser" :disabled="inputsError.btn_save.status">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
    .modal-header{
        background-color: rgb(5, 17, 123);
    }

    .modal-title{
        color: white;
    }

    .modal-body{
        padding: 1rem;
        overflow-y: auto;
    }

    .btn-close{
        background-color: rgb(255, 0, 0);
    }

    div > .error_input_message {
        display: flex !important;
        align-items: start !important;
        padding-top: 1%;
        padding-left: 1%;
    }

    .error_input_message{
        font-size: 95%;
    }
</style>

<script setup>
    import { ref, onMounted, reactive, defineExpose, onBeforeMount } from 'vue';

    /**
     * IMPORT ANIMATIONS
     */
    import animatedPlaceholder from '@/components/animated/AnimatedPlaceholder'
    import Loader from '@/components/animated/Loader.vue'
    import { showAlert } from '@/utils/alerts'

    /**
     * IMPORT FUNCTION TO SEND REQUEST
     */
    import { sendRequest } from '@/utils/requests';

    /**
     * INSTANCE LOADER
     */
    const isLoading = ref(false)

    /**
     * LIST OF ROLES
     */
    const selectors = reactive({
        roles: ref({})
    })

    /**
     * INPUTS
     */
    const inputs = reactive({
        name: ref(''),
        lastname: ref(''),
        username: ref(''),
        pcc: ref(''),
        unit: ref(''),
        role_id: ref(0),
    })

    /**
     * ERROR INPUTS
     */
    const inputsError = reactive({
        role_id: {
            status:     ref(true),
            error:      ref(false),
            message:    ref(''),
        },
        btn_save: {
            status:     ref(true),
            error:      ref(false),
            message:    ref(''),
        },
    })

    /**
     * RESET ERROR MESSAGES
     */
     const resetErrorMessages = () => {
        for (const key in inputsError) {
            inputsError[key].status = false;
            inputsError[key].message = '';
        }
    };

    /**
     * EMIT TO RELOAD USERS TABLE
     */
    const emit = defineEmits(['reload-users-table']);

    /**
     * ID AND ACTION
     */
    const registerInfo = reactive({
        action: ref(''),
        database_id: ref(0),
        user: ref({})
    });

    /**
     * OPTIONS FOR CREATE, VIEW OR EDIT DATA
     */
    const formData = async(record) => {
        /**
         * TURN ON LOADER
         */
        isLoading.value = true

        /**
         * GET DATA FROM PARENT COMPONENT
         */
        registerInfo.action = record.action;
        registerInfo.database_id = record.database_id
        registerInfo.user = record.user

        /**
         * GET LIST OF ROLES
         */
        selectors.roles = record.data

        /**
         * RESET ERROR MESSAGES
         */
        resetErrorMessages();

        /**
         * PUT DATA IN INPUTS
         */
        for(const key in inputs){
            inputs[key] = registerInfo.user[key];
        }

        /**
         * ACTIONS
         */
        switch (registerInfo.action) {
            case 'view':
                /**
                 * DISABLE INPUTS
                 */
                for(const key in inputsError){
                    inputsError[key].status = true;
                }
            break;
            case 'edit':
                /**
                 * ENABLLE INPUTS
                 */
                for(const key in inputsError){
                    inputsError[key].status = false;
                }
            break;
        }

        /**
         * TURN OFF LOADER
         */
        isLoading.value = false
    }

    /**
     * USE THIS FUNCTION IN PARENT COMPONENT
     */
    defineExpose({
        formData,
    })

    /**
     * PREVENT DEFAULT CHANGE USER ROLE
     */ 
    const onSubmitUser = async (e) => {
        e.preventDefault()

        /**
         * TURN ON LOADER
         */
        isLoading.value = true

        /**
         * RESET ERROR MESSAGES
         */
        resetErrorMessages();

        /**
         * INITIALIZE RESPONSE VAR
         */
        let response = null;

        /**
         * GET ROLES ID
         */
        const updatedRoles = reactive([]);
        updatedRoles.push(inputs.role_id);

        /**
         * SEND REQUEST
         */
        response = await sendRequest('post', 'api/update_roles_by_user', {user_id: registerInfo.user.id, roles_id: updatedRoles, database_id: registerInfo.database_id})

        /**
         * GET RESPONSE
         */
         if(response != null && response.status){
            showAlert('Éxito', 'success', 'Roles modificados exitosamente')  
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
        // emit('reload-users-table');
    }
</script>