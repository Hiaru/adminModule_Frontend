<template>
    <usersModal ref="userModal" @reload-users-table="reloadUsersTable"></usersModal>
    <button hidden type="button" class="btn btn-primary mt-2 mb-4" data-bs-toggle="modal" data-bs-target="#userModal"  data-bs-backdrop="static" id="userModalButton"></button>

    <div class="mt-3" v-if="type == 'users'">
        <UsersTable v-if="data == 0" ref="usersTableRef" @open-user-modal="openUserModal" :key="datatableUsers"></UsersTable>
    </div>
</template>

<script setup>
    import { ref, reactive, watch, onMounted, defineExpose } from 'vue';

    /**
     * IMPORT JQUERY
     */
    import $ from 'jquery';

    /**
     * MODALS
     */
    import usersModal from '@/views/modals/userModal'

    /**
     * IMPORT TABS 
     */
    import UsersTable from '@/views/datatables/UsersTable'

    /**
     * MODAL AND DATATABLE FOR MANIPULATION
     */
    const userModal = ref(null);
    const datatableUsers = ref(0);

    /**
     * OBTAIN DATA AND TITLES FOR TABS
     */
    const props = defineProps({
        data: {
            type: Number,
            required: false,
        },
        type: {
            type: String,
            required: true,
        }
    })

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
        console.log('new ID', parentData.value)
    };

    /**
     * EXPOSE THE FUNCTION IN CHILD COMPONENT TO USE IN PARENT COMPONENT
     */ 
    defineExpose({ handleUpdateInfo })

    /**
     * REFERENCE THE ACTUAL SELECTED TAB TO USE FUNCTIONS INSIDE THE TAB
     */
    const usersTableRef = ref(null);

    /**
     * WATCH CHANGE SELECTOR
     */
    watch(
        () => parentData.value,
        (newValue, oldValue) => {
            /**
             * SEND NEW ID TO CHILD COMPONENT
             */
            usersTableRef.value.handleUpdateInfo(newValue);
        }
    );

    /**
     * SEND DATA TO CHILD COMPONENT
     */
    const sendData = async (user) => {
        const data = await user
        return data;
    }

    /**
     * OPEN MODAL FROM SIBBLING COMPONENT
     */
     const openUserModal = async(data) => {
        /**
         * GET DATA FROM CHILD COMPONENT
         */
        const record = await data;

        /**
         * SEND DATA TO ANOTHER CHILD COMPONENT 
         */
        await userModal.value.formData(record);

        /**
         * SELECT AND OPEN THE MODAL
         */
        document.getElementById('userModalButton').click();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    /**
     * RELOAD CONTROLS TABLE
     */
     const reloadUsersTable = () => {
        console.log('Reloading users table');
        // Emit event to parent component
        datatableUsers.value += 1;
    };

</script>