<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header text-bg-info">
                <h3 class="card-title">USUARIOS</h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <label for="rm_type_id" class="form-label">Base de Datos a Consultar</label>
                            <div class="input-group text">
                                <span class="input-group-append">
                                    <span class="input-group-text bg-ligh d-block">
                                        <i class="fa-solid fa-list-ul"></i>
                                    </span>
                                </span>
                                <!-- <select class="form-control" id="users_database_id" v-model="inputs.users_database_id" :disabled="inputs.users_database_id"> -->
                                <select class="form-control" id="users_database_id">
                                    <option default value="0" disabled>Seleccione la Base de Datos a Consultar</option>
                                    <option value="1">Matriz de Riesgo</option>
                                    <!-- <option v-for="rmType in selectors.sRm_Type" :value="rmType[0]" :key="rmType[0]">
                                        {{ rmType[1] }}
                                    </option> -->
                                </select>
                            </div>
                    </div>
                    <div class="col-6">
                        <!-- <button type="button" class="btn-search search-users" act="search" @click="searchUsers">Buscar Usuarios</button> -->
                        <button type="button" class="btn-search search-users" act="search">Buscar Usuarios</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>