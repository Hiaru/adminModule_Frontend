<template>
    <div class="container d-flex flex-column align-items-center justify-content-center" style="height: 90vh;">
        <div class="card w-50">
            <div class="card-header" style="background-color: #001a4d;">
                <div class="h3 text-center text-light">INICIO DE SESIÓN</div>
            </div>
            <div class="card-body" style="background-color: #f1f1f1;">
                <form @submit.prevent="onSubmitLogin">
                    <div class="row mt-4 h5 mx-auto" style="width: 100%;">
                        <div class="col-4 d-flex flex-column align-items-center justify-content-center">
                            <img class="mb-4" src="@/assets/logo_GGSI.png" alt="" width="90">
                        </div>
                        <div class="col-4 my-auto d-flex flex-column align-items-center justify-content-center">
                            <img class="mb-4 mx-auto" src="@/assets/logo_color_CANTV.png" alt="" width="120">
                        </div>
                        <div class="col-4 align-items-center d-flex flex-column align-items-center justify-content-center">
                            <img class="mb-4" src="@/assets/logo_gsos.png" alt="" width="100">
                        </div>
                        <!-- <span span style="color: #333d52">Datos del Usuario</span> -->
                    </div>
                    <div class="row mt-5 mx-auto" style="width: 90%;">
                        <div class="col-12">
                            <div class="form-floating mb-3 h6">
                                <input type="text" class="form-control inputs-border" id="username" placeholder="" required>
                                <label for="username"><span style="color: #333d52">Usuario</span></label>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4 mx-auto" style="width: 90%;">
                        <div class="col-12">
                            <div class="form-floating mb-3 h6">
                                <input type="password" class="form-control inputs-border" id="password" placeholder="" required>
                                <label for="password"><span style="color: #333d52">Contraseña</span></label>
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
</style>

<script setup>

    /**
     * PREVENT DEFAULT LOGIN
     */
     const onSubmitLogin = async (e) => {
        console.log('here');
        var count = 0;
        e.preventDefault();
     }

</script>