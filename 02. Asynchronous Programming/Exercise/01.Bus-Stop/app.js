async function getInfo() {
    // read input value
    const stopId = document.getElementById('stopId').value;
    // get fields to visualise data later
    const stopNameField = document.getElementById('stopName');
    const timeTableField = document.getElementById('buses');

    //make request to server
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try { // using try-catch to catch exceptions when there is no data in the response and converting it to json would give error
        stopNameField.textContent = 'Loading...' // nice to jave from UX perspective
        timeTableField.replaceChildren();// clears the results from the prevous request
        const response = await fetch(url); //fetch sends Get request that returns Promise

        if(response.status != 200){ // if the head of the response is different from 200 we don't convert the body to json as that would throw an error
            throw new Error('Stop ID not found');
        }
        
        const data = await response.json(); //to get the data from the Promise we convert it to object using .json()    
    
        // visulizing data
        stopNameField.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            timeTableField.appendChild(liElement);
        })
    }
    catch (error) {
        stopNameField.textContent = 'Error';
    }
}