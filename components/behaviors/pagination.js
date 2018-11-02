const paginationBev = Behavior({
    data : {
        searchResult : [],
        total : null,
        noneResult : false,
        loading: false
    },
    methods:{
        setMoreData(searchResult){
            const temp = this.data.searchResult.concat(searchResult)
            this.setData({
                searchResult : temp
            })
        },

        getCurrentStart(){
            return this.data.searchResult.length
        },

        setTotal(total){
            this.data.total = total
            if(total == 0){
                this.setData({
                    noneResult:true
                })
            }
        },

        hasMore(){
            if(this.data.searchResult.length >= this.data.total){
                return false
            }
            return true
        },

        initialize(){
            this.setData({
                searchResult : [],
                noneResult:false,
                loading:false
            })
            this.data.total = null
        },

        isLocked() {
            return this.data.loading ? true : false
        },

        locked() {
            this.setData({
                loading: true
            })
        },

        unLocked() {
            this.setData({
                loading: false
            })
        },
    }
})

export { paginationBev }