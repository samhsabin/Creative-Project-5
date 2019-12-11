var app = new Vue({
  el: '#app',
  data: {
    name: "",
    price: 0,
    productUrl: "",
    numOrders: 0,
    file: null,
    addItem: null,
    items: [],
    item: '',
    findName: "",
    findItem: null,
    i: 0,
    checkedItems: [],
    index: null,
    selected: false,
  },
  created() {
    this.getItems();
  },

  methods: {

    async postItem(item) {
      console.log("name is " + this.name);
      console.log("price is " + this.price);
      console.log("url is  " + this.productUrl);
      console.log("num orders is " + this.numOrders);
        console.log("initiated");
      try {
        let response = await axios.post('/api/candidates', {
          name: this.name,
          price: this.price,
          productUrl: this.productUrl,
          numOrders: this.numOrders,
        });
      }
      catch (error) {
        console.log(error);
      }
    },
    
    async getItems() {
      try {
        let response = await axios.get("/api/candidates");
        this.items = response.data;
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/candidates/" + item._id);
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async addVotes(item) {
      try {
            let response = await axios.put("/api/candidates/" + item._id);
            this.getItems();
            return true;
          }
          catch (error) {
            console.log(error);
          }
          console.log(item.name + " is checked");
    },

    async submitVotes(items, checkedItems) {
      for (var item of this.items) {
        if (item.selected) {
          this.addVotes(item);
          this.checkedItems.push(item);
        }
        else {
          console.log(item.name + " is not checked");
        }
      }
    },

    // async deleteItem(item) {
    //   try {
    //     let response = axios.delete("/api/candidates/" + item._id);
    //     this.findItem = null;
    //     this.getItems();
    //     return true;
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    // },

    // async editItem(item) {
    //   try {
    //     let response = await axios.put("/api/candidates/" + item._id);
    //     this.getItems();
    //     return true;
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    // },
  },

});