const app = Vue.createApp({
    data() {
        return {
            userProfile: null,
            city: 'London',  // Default city
            province: 'Ontario',  // Default province
            country: 'Canada',  // Default country
            weather:null,
            wordDefinition: null
        };
    },

    // Methods for fetching data and handling user interactions
    methods: {
        fetchRandomUserProfile() {
            // Sending a request to get a random user profile
            fetch('https://comp6062.liamstewart.ca/random-user-profile')
                .then(response => response.json())  // Parse the response to JSON
                .then(data => {
                    this.userProfile = data;  // Directly assign the data
                });
        },
        getNewProfile() {
            this.fetchRandomUserProfile();  // Fetch a new random profile when the button is clicked
        },

        getWeather() {            
            // Fetch the weather data
            fetch(`https://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`)
                .then(response => response.json())  // Parse the response as JSON
                .then(data => {
                    // Store the weather data
                    this.weather = data;
                })
                .catch(error => {
                    console.error('Error fetching weather:', error);
                    this.weather = null;  // Reset in case of error
                });
        },

        getWordDefinition() {
            // Fetch the word definition
            fetch(`https://comp6062.liamstewart.ca/define?word=${this.word}`)
                .then(response => response.json())  // Parse the response as JSON
                .then(data => {
                    // Store the word definition data
                    if (Array.isArray(data) && data.length > 0) {
                        this.wordDefinition = data;
                    } else {
                        //Shows popup error if no definition found
                        alert("No definition found for the word.");
                        this.wordDefinition = null;  // Reset if no definition is found
                    }
                    
                })
                .catch(error => {
                    console.error("Error fetching word definition:", error);
                    this.wordDefinition = null;  // Reset in case of error
                });
        },
    },

    created() {
        this.fetchRandomUserProfile();  // Fetch the initial profile when the app is created
        this.getWeather();
    }
});

app.mount('#app');
