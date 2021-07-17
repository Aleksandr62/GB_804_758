<template>
    <div v-if="pages.length > 1" class="pagination">
        <button class="page"
        :disabled="curPage === 1"
        @click="curPage -= 1"        
        >
        &lt;
        </button>
        <button class="page"
        :class="{ active_page : curPage === page  }"
        v-for="(page, idx) in pages" 
        :key="idx" 
        @click="curPage = page"
        > 
        {{ page }} 
        </button>
        <button class="page"
        :disabled="curPage === pages.length"
        @click="curPage += 1"
        >
        &gt;
        </button>        
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        quantityOnPage: {
            type: Number,
            default: 1
        },
        pages: {
            type: Array,
            default: () => [] 
        },
        curPage: {
            type: Number,
            default: 1
        },                   
    },
    watch: {
        curPage: function(page) {
            this.$router.push({path: `/dashboard/${this.pages[page - 1]}`})
        } 
    }
}
</script>

<style scoped>
.pagination {
    margin-top: 12px;
    border-top: 1px solid #BEBEBE;
    border-bottom: 1px solid #BEBEBE;    
    color: #222222;
    display: flex;
    width: fit-content;
}
.page {
    margin-left: 5px;
    margin-right: 5px;
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    background: transparent;
}
.page:hover:not(:disabled) {
    color: red;
    background: #E3E3E3; 
}
.active_page {
    color: red;
    background: #BEBEBE; 
}
</style>