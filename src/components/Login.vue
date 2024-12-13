<template>
    <Loader v-if="isLoading" class="my-auto mx-auto"/>
    <div class="container d-flex flex-column align-items-center justify-content-center" style="height: 90vh;">
        <div class="card w-50">
            <div class="card-header" style="background-color: #001a4d;">
                <div class="row mt-3 align-content-center justify-content-center">
                    <div class="col-4 my-auto d-flex flex-column align-items-center justify-content-center">
                        <img class="mb-2" src="@/assets/logo_blanco_CANTV.png" alt="" width="160">
                    </div>
                </div>
                <!-- <div class="h3 text-center text-light">INICIO DE SESIÓN</div> -->
            </div>
            <div class="card-body" style="background-color: #f1f1f1;">
                <form @submit.prevent="onSubmitLogin">
                    <!-- <div class="mt-4 h4">DATOS DEL USUARIO</div> -->
                    <!-- <div class="row mt-4 h5 mx-auto" style="width: 100%;">
                        <div class="col-4 d-flex flex-column align-items-center justify-content-center">
                            <img class="mb-4" src="@/assets/logo_GGSI.png" alt="" width="90">
                        </div>
                        <div class="col-4 my-auto d-flex flex-column align-items-center justify-content-center">
                            <img class="mb-4 mx-auto" src="@/assets/logo_color_CANTV.png" alt="" width="120">
                        </div>
                        <div class="col-4 align-items-center d-flex flex-column align-items-center justify-content-center">
                            <img class="mb-4" src="@/assets/logo_gsos.png" alt="" width="100">
                        </div>
                    </div> -->
                    <div class="row mt-5 mx-auto" style="width: 90%;">
                        <div class="col-12">
                            <div class="h5" style="color:#001a4d"><b>Usuario</b></div>
                            <div class="form-floating mt-3 mb-3 h6">
                                <input type="text" class="form-control inputs-border" id="username" v-model="inputs.username" placeholder="">
                                <label for="username"><span style="color: #333d52">Usuario</span></label>
                                <p class="error_input_message fw-semibold ml-1 text-danger" v-bind:disabled="inputsError.username.error" v-text="inputsError.username.message" id="error_input_message" name="error_input_message"></p>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4 mx-auto" style="width: 90%;">
                        <div class="col-12">
                            <div class="h5" style="color:#001a4d"><b>Contraseña</b></div>
                            <div class="form-floating mt-3 mb-3 h6">
                                <input type="password" class="form-control inputs-border" id="password" v-model="inputs.password" placeholder="">
                                <label for="password"><span style="color: #333d52">Contraseña</span></label>
                                <p class="error_input_message fw-semibold ml-1 text-danger" v-bind:disabled="inputsError.password.error" v-text="inputsError.password.message" id="error_input_message" name="error_input_message"></p>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4 mb-5 mx-auto" style="width: 80%;">
                        <button type="submit"><span class="h5">Iniciar Sesión</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .inputs-border {
        /* background-color: #f1f1f1; */
        border-color: #b1c8cc;
        border-width: medium;
    }
    
    button {
        padding: 17px 40px;
        border-radius: 10px;
        border: 0;
        background-color: #084f93;
        letter-spacing: 1px;
        font-size: 15px;
        transition: all 0.3s ease;
        box-shadow: #001a4d 0px 10px 0px 0px;
        color: hsl(0, 0%, 100%);
        cursor: pointer;
    }

    button:hover {
        box-shadow: #001a4d 0px 7px 0px 0px;
    }

    button:active {
        background-color: #084f93;
        /*50, 168, 80*/
        box-shadow: #001a4d 0px 0px 0px 0px;
        transform: translateY(5px);
        transition: 200ms;
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
    /**
     * IMPORTS
     */
    import { ref, reactive } from 'vue'
    import { validate } from '@/utils/validations'
    import { showAlert } from '@/utils/alerts'
    import { useAuthStore } from '@/store/auth';
    import Loader from '@/components/animated/Loader.vue'

    /**
     * LOADER
     */
    const isLoading = ref(false);

    /**
     * INITIALIZE AUTH STORE
     */
    const authStore = useAuthStore();

    /**
     * INPUTS FOR LOGIN
     */
    const inputs = reactive({
        username: ref(''),
        password: ref(''),
    })

    /**
     * ERROR INPUTS
     */
    const inputsError = reactive({
        username: {
            status:     ref(true),
            error:      ref(false),
            message:    ref(''),
        },
        password: {
            status:     ref(true),
            status:     ref(false),
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
     * PREVENT DEFAULT LOGIN
     */
     const onSubmitLogin = async (e) => {
        var count = 0;
        e.preventDefault();

        /**
         * TURN ON LOADER
         */
        isLoading.value = true;

        for(const key in inputs){
            /**
             * FUNCTION TO VALIDATE ANY INPUT
             */
            var response = await validate('login', key, inputs[key], inputsError[key].status);

            /**
             * GET RESPONSE
             */
            if(Array.isArray(response)) {
                /**
                 * SHOW ERROR MESSAGES
                 */
                inputsError[key].status = true;
                inputsError[key].message = response[2];
                count++;
            }else{
                /**
                 * HIDE ERROR MESSAGES
                 */
                inputsError[key].status = false;
                inputsError[key].message = '';
            }
        }

        /**
         * CHECK COUNT ERRORS
         */
        if(count !== 0){
            /**
             * IF THERE ARE ERRORS, SHOW ALERT
             */
             showAlert('Oops..', 'error',  'Exísten errores en el formulario', '');
        }else{
            /**
             * RESET ERROR MESSAGES
             */
            resetErrorMessages();

            /**
             * SEND REQUEST TO BE
             */
            let response = null; 
            response = await authStore.login(inputs);

            /**
             * GET RESPONSE
             */
            //  if(response != null && !response.status){
            //     /**
            //      * SHOW ERRORS FROM BE
            //      */
            //     if(response.status.errors){
            //         Object.entries(response.errors).forEach(([key, value]) => {
            //             errorInput[key] = true;
            //             messageInput[key] = `${value}`;
            //         });
            //     }   
            // }
        }

        /**
         * TURN OFF LOADER
         */
        isLoading.value = false;
     }

</script>