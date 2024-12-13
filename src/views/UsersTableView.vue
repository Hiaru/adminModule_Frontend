<template>
    <Loader v-if="isLoading" class="my-auto mx-auto"/>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header text-bg-info">
                <h3 class="card-title">USUARIOS</h3>
            </div>
            <div class="card-body">
                <div class="row mt-3">
                    <div class="col-9 mb-2">
                        <div v-if="isLoading">
                            <AnimatedPlaceholder height="100%" width="15%" borderRadius="5%" style="margin-top: 4%;"/>
                        </div>
                        <div v-else>
                            <div class="form-floating">
                                <select class="form-select" id="users_database_id" v-model="inputs.database">
                                <!-- <select class="form-control" id="users_database_id"> -->
                                    <option selected disabled>Seleccione la Base de Datos a Consultar</option>
                                    <option v-for="database in selectors.databases" :value="database.id" :key="database.id">
                                        {{ database.description }}
                                    </option>
                                    <option :value="2" :key="2">TESTING 2</option>
                                    <option :value="3" :key="2">TESTING 3</option>
                                    <option :value="4" :key="2">TESTING 4</option>
                                </select>
                                <label for="users_database_id" class="form-label">Base de Datos a Consultar</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <!-- <button type="button" class="btn-search search-users" act="search" @click="searchUsers">Buscar Usuarios</button> -->
                        <button type="button" class="btn-search search-users" act="search" @click="searchUsers"><b>Buscar Usuarios</b></button>
                    </div>
                </div>
                <div class="row mt-5">
                    <Tabs :titles="['Usuarios', 'Roles']" :active="0" @updateData="handleUpdateData">
                        <TabsItem :data="tabData" :type="typeComponent" ref="tabItemRef"></TabsItem>
                    </Tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .btn-search {
        width: auto;
        padding: 15px 15px 40px 15px;
        height: 40px;
        font-size: 1.1em;
        cursor: pointer;
        background-color: #133573;
        color: #fff;
        border: none;
        border-radius: 5px;
        transition: all .4s;
    }

    .btn-search:hover {
        border-radius: 5px;
        transform: translateY(-10px);
        box-shadow: 0 7px 0 -2px #d11cfd,
        0 15px 0 -4px #3a15e8,
        0 16px 10px -3px #3a15e8;
    }

    .btn-search:active {
        transition: all 0.2s;
        transform: translateY(-5px);
        box-shadow: 0 2px 0 -2px #d11cfd,
        0 8px 0 -4px #3a15e8,
        0 12px 10px -3px #3a15e8;
    }
</style>

<script setup>
    import { ref, onBeforeMount, reactive, watch } from 'vue'

    /**
     * IMPORT ANIMATIONS
     */
    import AnimatedPlaceholder from '@/components/animated/AnimatedPlaceholder'
    import Loader from '@/components/animated/Loader.vue'

    /**
     * IMPORT FUNCTION TO SEND REQUEST
     */
    import { sendRequest } from '@/utils/requests';

    /**
     * IMPORT TABS COMPONENT
     */
    import Tabs from "@/components/tabs/Tabs";
    import TabsItem from "@/components/tabs/TabsItem";

    /**
     * INTIALIZE TAB DATA AND TYPE OF COMPONENT FOR TABS
     */
    const tabData = ref(null)
    const typeComponent = ref('users')

    /**
     * SEND DATA TO TABS
     */
    const handleUpdateData = (data) => {
        /**
         * CATCH ACTUAL TAB
         */
        tabData.value = data
    }

    /**
     * SELECTORS
     */
    const selectors = reactive({
        databases: ref([])
    })

    /**
     * INPUTS
     */
    const inputs = reactive({
        database: ref(0)
    })

    /**
     * REFERENCE THE ACTUAL SELECTED TAB TO USE FUNCTIONS INSIDE THE TAB
     */
    const tabItemRef = ref(null);

    /**
     * WATCH CHANGE SELECTOR
     */
    watch(
        () => inputs.database,
        (newValue, oldValue) => {
            /**
             * SEND NEW ID TO CHILD COMPONENT
             */
            tabItemRef.value.handleUpdateInfo(newValue);
        }
    );

    /**
     * LOADER
     */
    const isLoading = ref(true);

    /**
     * GET DATA
     */
    onBeforeMount(async () => {
        try {
            /**
             * TURN ON LOADER
             */
            isLoading.value = true;

            /**
             * GET DATA FROM BE
             */
            const response = await sendRequest('get', 'api/get_databases_names', '')

            /**
             * VERIFY IF REQUEST WAS SUCCESSFUL
             */
             if(response.status){
                selectors.databases = response.data
             }

            /**
             * TURN OFF LOADER
             */
            isLoading.value = false;

        } catch(error) {
            console.log(error);
        }
    })

    /**
     * FUNCTION TO SEARCH USERS
     */
    const searchUsers = async () => {
        try {
            /**
             * VERIFY IF DATABASE IS SELECTED
             */
            if(inputs.database > 0){
                /**
             * TURN ON LOADING
             */
            isLoading.value = true;

            /**
             * GET DATA FROM BE
             */
            const response = await sendRequest('post', 'api/get_all_users_with_roles', {database_id: inputs.database})

            /**
             * TURN OFF LOADING
             */
            isLoading.value = false;
            }
        }
        catch(error) {
            console.log(error);
        }
    }
</script>