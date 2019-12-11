var app = new Vue({
  el: '#app',
  data: {
    name: "",
    price: null,
    productUrl: "",
    itunesUrl: "",
    file: null,
    addItem: null,
    items: [],
    path: "",
  },
  created() {
      this.getItems();
    },
    
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    //add item in postItem()
    async postItem(item) {
      console.log("name is " + this.name);
      console.log("itunesUrl is " + this.itunesUrl);
        console.log("initiated");
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        console.log("this.file: " + this.file);
        console.log("this.file.name" + this.file.name);
        let r1 = await axios.post('/api/photos', formData);
        console.log("picture is " + r1.data.path);
        let r2 = await axios.post('/api/songs', {
          name: this.name,
          itunesUrl: this.itunesUrl,
          path: r1.data.path
          
        });
        
      }
      catch (error) {
        console.log(error);
      }
    },
    
    async getItems() {
      try {
        let response = await axios.get("/api/songs");
        this.items = response.data;
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/songs/" + item._id);
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  
});