const app = Vue.createApp({
    data() {
        return {
            userProfile: null,
            city: 'London',  // Default city
            province: 'Ontario',  // Default province
            country: 'Canada',  // Default country
            weather:null,
            word: '',  // The word the user inputs
            wordDefinition: null
        };
    },

    methods: {
        fetchRandomUserProfile() {
            fetch('https://comp6062.liamstewart.ca/random-user-profile')
                .then(response => response.json())  // Parse the response to JSON
                .then(data => {
                    this.userProfile = data;  // Directly assign the data (because it's already in the correct format)
                });
        },
        getNewProfile() {
            this.fetchRandomUserProfile();  // Fetch a new random profile when the button is clicked
        },

        getWeather() {
            // Construct the URL with user input (city, province, country)
            const url = `https://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`;
            
            // Fetch the weather data
            fetch(url)
                .then(response => response.json())  // Parse the response as JSON
                .then(data => {
                    // Store the weather data
                    this.weather = {
                        temperature: data.temperature,
                        wind: data.wind_speed,
                        description: data.weather_description,
                    };
                })
                .catch(error => {
                    console.error('Error fetching weather:', error);
                    this.weather = null;  // Reset in case of error
                });
        },

        getWordDefinition() {
            // Make sure the user has entered a word
            if (!this.word.trim()) {
                alert("Please enter a word!");
                return;
            }

            // Construct the URL for the dictionary API
            const url = `https://comp6062.liamstewart.ca/define?word=${this.word}`;

            // Fetch the word definition
            fetch(url)
                .then(response => response.json())  // Parse the response as JSON
                .then(data => {
                    // Store the word definition data
                    if (Array.isArray(data) && data.length > 0) {
                        // Access the first element of the array
                        const wordData = data[0];  
                        this.wordDefinition = {
                            word: wordData.word,
                            phonetic: wordData.phonetic,
                            definition: wordData.definition,
                        };
                    } else {
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
