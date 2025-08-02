// openweather api
const weatherKey = '8d6cc0740f87e2604a4fb22c82e5ca4a';
const city = 'Moscow';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;


fetch(weatherUrl)
.then((response) => {

if (!response.ok) {
throw new Error(`Данные не получены: + ${response.status}`);
}

return response.json();
})
.then((data) => console.log(data));


// dadata Suggestion
const input = document.getElementById("address");
    Dadata.createSuggestions(input, {
        token: "961a3da7a6e0a6f8f0caa60b587154bd97eeca57",
        type: "address",
    hint: false,
    params: {
        from_bound: { value: "city" },
        to_bound: { value: "city" },
        locations: [{ city_type_full: "город" }],
    },
    beforeFormat,
    formatSelected,
    onSelect(suggestion) {
        console.log(suggestion);
    },
});

function beforeFormat(suggestion) {
    const newValue = suggestion.data.city;
    suggestion.value = newValue;
    return suggestion;
};

function formatSelected(suggestion) {
    return suggestion.data.city;
};
