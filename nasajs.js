document.getElementById("fetchButton").addEventListener("click", fetchSpaceEvent);

async function fetchSpaceEvent() {
    const date = document.getElementById("dateInput").value;
    const apodAPIKey = "tlGfAAlLZ7iyyjApQDYKkY7MGjCmS0A4S6wC4qzq"; // Replace with your actual NASA API key
    
    try {
        console.log("Fetching data from NASA API...");
        const apodResponse = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apodAPIKey}&date=${date}`);
        
        if (!apodResponse.ok) {
            const errorDetails = await apodResponse.json();  // Capture more error details
            throw new Error(`Error ${apodResponse.status}: ${errorDetails.msg}`);
        }

        const apodData = await apodResponse.json();
        console.log("Data received:", apodData);

        const resultsDiv = document.getElementById("results");

        // Check the media type and display either an image or a video
        if (apodData.media_type === "image") {
            resultsDiv.innerHTML = `
                <h2>${apodData.title}</h2>
                <img src="${apodData.url}" alt="${apodData.title}" style="max-width: 100%; height: auto;">
                <p>${apodData.explanation}</p>
            `;
        } else if (apodData.media_type === "video") {
            resultsDiv.innerHTML = `
                <h2>${apodData.title}</h2>
                <iframe src="${apodData.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="max-width: 100%; height: 500px;"></iframe>
                <p>${apodData.explanation}</p>
            `;
        } else {
            resultsDiv.innerHTML = `<p>Unknown media type.</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("results").innerHTML = `<p>Sorry, there was an error fetching data: ${error.message}</p>`;
    }
}


