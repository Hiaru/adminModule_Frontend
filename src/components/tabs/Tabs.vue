<template>
    <div>
        <ul class="nav nav-tabs">
            <li v-for="(title, index) in titles" :key="index" class="nav-item">
                <a
                    class="nav-link"
                    :class="{ active: index === activeTab }"
                    href="#"
                    @click.prevent="selectTab(index)"
                >
                    {{ title }}
                </a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';

    /**
     * TITLES FOR TABS AND GET THE SELECTED TAB BY USER
     */
    const props = defineProps({
        titles: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            default: 0
        }
    })

    /**
     * EMIT TO SEND UPDATED DATA TO SELECTED TAB
     */
    const emit = defineEmits(['updateData'])

    /**
     * GET THE ACTUAL ACTIVE TAB
     */
    const activeTab = ref(props.active)

    /**
     * HEAR WHEN USER CHANGES TAB
     */
    watch(activeTab, (newIndex) => {
        /**
         * GET ID ABOUT SELECTED TAB BY USER
         */
        fetchData(newIndex)
    })

    /**
     * GET THE ACTIVE TAB WHEN THE COMPONENT IS MOUNTED
     */
    onMounted(() => {
        fetchData(activeTab.value)
    })

    /**
     * SET THE SELECTED TAB BY USE (WHEN USERS CLICK THE TAB)
     */
    const selectTab = (index) => {
        activeTab.value = index;
    }

    /**
     * GET DATA TO SEND TO RENDERED SELECTED TAB
     */
    const fetchData = (index) => {
        let data = index;

        /**
         * TODO: SWITCH CASE
         */

        /**
         * SEND DATA TO TAB
         */
        emit('updateData', data)
    }


</script>