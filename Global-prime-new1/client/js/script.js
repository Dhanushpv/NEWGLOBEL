

async function applyJob(event) {
    event.preventDefault();

    // Retrieve input values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let profolio = document.getElementById('profolio').value;
    let imageInput = document.getElementById('image');
    let coverleter =document.getElementById('coverleter').value;

    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onloadend = async function () {
            let base64ImageString = reader.result; // Base64 string of the image

            let data = {
                name,
                email,
                profolio,
                coverleter,
                imageInput: base64ImageString  // Changed key to 'image' for clarity
            };
            
            let strData = JSON.stringify(data);
            console.log("Form data: ", strData);

            try {
                let response = await fetch('/user', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: strData,
                });

                console.log("Response", response);

                if (response.status === 200) {
                    alert('Application successfully submitted!');
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                console.log("Error:", error);
                alert('Error occurred while submitting the form.');
            }
        };

        reader.readAsDataURL(file); // Start reading the image file as base64
    } else {
        alert('Please select an image.');
    }
}

async function ApplicationView() {
    
    console.log("reached at .....")

    try {
            
        const response = await fetch('/user', {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const parsed_data = await response.json();
        console.log(parsed_data)

        let data = parsed_data.data
        console.log("data",data);

        const tableBody = document.getElementById('applicationView');
        let row='';
        for(let i=0; i<data.length ; i++){
          

        
            row += `
                <div class="row g-4">
                    <div class="col-sm-12 col-md-8 d-flex align-items-center">
                        <img class="flex-shrink-0 img-fluid border rounded" 
                            src="${data[i].imageInput}" 
                            alt="${data[i].jobTitle} image" 
                            style="width: 80px; height: 80px;" 
                            ;">


                        <div class="text-start ps-4">
                            <h5 class="mb-3">${data[i].name}</h5>
                            <div class="text-truncate me-3"><i class=" text-primary me-2"></i>${data[i].email}</div>
                            <div class="text-truncate me-3"><i class=" text-primary me-2"></i>${data[i].profolio}</div>
                            <div class="text-truncate me-0"><i class=" text-primary me-2"></i>${data[i].coverleter.slice(0,100)+"...."}</div>
                        </div>
                    </div>
                   
                </div>
            `;

            // tableBody.appendChild(row);
            tableBody.innerHTML =row;

        }

    } catch (error) {

        console.error('Fetch error:', error);

    }

}

async function addjob(event) {
    event.preventDefault();

    // Collect form values
    let jobTitle = document.getElementById('jobtitle').value;
    let jobLocation = document.getElementById('joblocation').value;
    let jobTime = document.getElementById('jobtime').value;
    let salary = document.getElementById('salary').value;
    let DateLine = document.getElementById('dateline').value;
    let Job_description = document.getElementById('job_Discription').value;
    let Responsibility = document.getElementById('responsibility').value;
    let Qualifications = document.getElementById('qualifications').value;
    let imageInput = document.getElementById('image');

    if (!jobTitle || !jobLocation || !jobTime || !salary || !DateLine || !Job_description || !Responsibility || !Qualifications) {
        alert("Please fill out all fields.");
        return;
    }

    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onloadend = async function () {
            let base64ImageString = reader.result; // Base64 string of the image

            let data = {
                jobTitle,
                jobLocation,
                jobTime,
                salary,
                imageInput: base64ImageString,
                DateLine,
                Job_description,
                Responsibility,
                Qualifications,
            };

            let strData = JSON.stringify(data);
            console.log("Form data: ", strData);  // Log the form data

            try {
                // Make sure you're sending the request to the correct backend server
                let response = await fetch('/jobList', {  // Use your backend URL
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: strData,
                });

                // Check if response is OK
                if (!response.ok) {
                    console.error("Fetch failed with status:", response.status);
                    let errorText = await response.text();
                    console.error("Error response text:", errorText);  // Log the error response text
                    alert('Error submitting the form: ' + errorText);
                    return;
                }

                let responseData = await response.json();  // Attempt to parse JSON response
                console.log("Response data:", responseData);  // Log parsed response data

                if (response.status === 200) {
                    alert('Job successfully added!');
                    document.getElementById('addJobForm').reset();  // Reset the form
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error("Network or server error:", error);  // Log network errors
                
            }
        };

        reader.readAsDataURL(file);  // Start reading the image file as base64
    } else {
        alert('Please select an image.');
    }
}

async function View(){
    // event.preventDefault()
    console.log("reached at .....")

    try {
            
        const response = await fetch('/joblist', {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const parsed_data = await response.json();
        console.log(parsed_data)

        let data = parsed_data.data
        console.log("data",data);

        const tableBody = document.getElementById('joblist');
        let row='';
        for(let i=0; i<data.length ; i++){

        
            row += `
                <div class="row g-4">
                    <div class="col-sm-12 col-md-8 d-flex align-items-center">
                        <img class="flex-shrink-0 img-fluid border rounded" 
                            src="${data[i].imageInput}" 
                            alt="${data[i].jobTitle} image" 
                            style="width: 80px; height: 80px;" 
                            ;">


                        <div class="text-start ps-4">
                            <h5 class="mb-3">${data[i].jobTitle}</h5>
                            <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>${data[i].jobLocation}</span>
                            <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>${data[i].jobTime}</span>
                            <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i>${data[i].salary}</span>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                        <div class="d-flex mb-3">
                            <a class="btn btn-light btn-square me-3" href=""><i class="far fa-heart text-primary"></i></a>
                            <a class="btn btn-primary" href="">Apply Now</a>
                        </div>
                        <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Date Line:${data[i].DateLine}</small>
                    </div>
                </div>
            `;

            // tableBody.appendChild(row);
            tableBody.innerHTML =row;

        }

    } catch (error) {

        console.error('Fetch error:', error);

    }
    
}
