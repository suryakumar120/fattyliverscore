$(function () {
    // Define your data object
    const dataObject = {
        FullName: "john",
        EmailId: "john@mail.com",
        City: "*",
        PhoneNo: "9999999999",
        name: "john",
        AgeGroup: "over35",
        Gender: "male",
        WrestMesaurment: "<29 inch",
        Bmi: "<23",
        Diabetes: "Yes",
        HbA1c: "<7",
        Cholesterol: "Yes",
        PhysicallyActive: "Yes",
        Drinkalcohol: "Yes",
        Menopause: "Yes",
        Total: 0,
        InsertedOn: "default",
        ID: 0,
    };
    var Total = 0;
    const retrievedDataObject = JSON.parse(localStorage.getItem('dataObject'));
    if (retrievedDataObject) {
        // If dataObject is retrieved successfully, update dataObject
        Object.assign(dataObject, retrievedDataObject);
    }
    function deleteDataAndRedirect(redirectUrl) {
        // Store dataObject in local storage
        localStorage.setItem('dataObject', JSON.stringify(dataObject));

        // Redirect to the specified URL
        window.location.href = redirectUrl;
    }
    function saveDataAndRedirect(redirectUrl) {
        // Store dataObject in local storage
        localStorage.setItem('dataObject', JSON.stringify(dataObject));

        // Redirect to the specified URL
        window.location.href = redirectUrl;
    }
    function SaveDataToServer(redirectUrl) {
        // Store dataObject in local storage
        localStorage.setItem('dataObject', JSON.stringify(dataObject));

        // Make a POST request to the server
        $.post('https://wordle-server2-heaqgnd3encpb3ak.southeastasia-01.azurewebsites.net/save-data', { data: JSON.stringify(dataObject) })
            .done(function (response) {
                // Redirect to the specified URL on success
                window.location.href = redirectUrl;
            })
            .fail(function (error) {
                // Handle the error if the request fails
                console.error('Error saving data:', error);
                // Optionally display an error message to the user
                // alert('Failed to save data. Please try again later.');
            });
    }
    // Event handler for the submit button
    $('#click_me_btn').on('click', function (event) {
        event.preventDefault();

        // Get values from form fields

        localStorage.clear();
        window.location.href = '2.html';
    });
    $('#submit-btn2').on('click', function (event) {
        event.preventDefault();

        // Get values from form fields
        var dataObject = {};
        dataObject.FullName = $('#txtname').val();
        dataObject.EmailId = $('#txtemail').val();
        dataObject.City = $('#txtcity').val();
        dataObject.PhoneNo = $('#txtmobile').val();

        // Check if any field is empty
        if (!dataObject.FullName || !dataObject.EmailId || !dataObject.City || !dataObject.PhoneNo) {
            alert('Please fill in all fields');
            return; // Prevent further execution
        }

        // Output dataObject to console
        console.log(dataObject);
        localStorage.setItem('dataObject', JSON.stringify(dataObject));
        window.location.href = '3.html';
    });

    $('#submit-btn3').on('click', function (event) {
        event.preventDefault();
        console.log("clicked3")
        window.location.href = '4.html';
    });

    $('input[name="age_group"]').on('click', function () {
        // Get the value of the selected radio button
        var ageGroup = $(this).val();

        // Update the AgeGroup property of the data object with the selected value
        dataObject.AgeGroup = ageGroup;
        if (ageGroup === 'over35') {
            Total = 2; // Set score to 2 if age group is over 35
        } else {
            Total = 0; // Set score to 0 otherwise
        }
        console.log("age=", Total);

    });
    $('#submit-btn4').on('click', function (event) {
        event.preventDefault();
        // console.log("clicked3")
        dataObject.Total += Total;
        saveDataAndRedirect('5.html')
    });
    $('input[name="gender"]').on('click', function () {
        // Get the value of the selected radio button
        var gender = $(this).val();

        // Update the AgeGroup property of the data object with the selected value
        dataObject.Gender = gender;
        localStorage.setItem('dataObject', JSON.stringify(dataObject));

    });

    $('#submit-btn5').on('click', function (event) {
        event.preventDefault();
        // console.log("clicked3")
        if (dataObject.Gender === 'male') {
            saveDataAndRedirect('7.html')
        } else {
            saveDataAndRedirect('6.html')
        }
    });


    $('input[name="waist_size"]').on('click', function () {
        // Get the value of the selected waist size
        var waistSize = $(this).val();

        // Assign scores based on the selected waist size
        switch (waistSize) {
            case '<29 inch':
                Total = 0;
                break;
            case '29-32.9 inch':
                Total = 2;
                break;
            case '33-36.9 inch':
                Total = 3;
                break;
            case '≥37 inch':
                Total = 4;
                break;
            default:
                Total += 0; // Default to 0 if no matching waist size is found
        }
        console.log("after waist=", dataObject.Total);
        // Update the WaistSize property of the data object with the selected value
        dataObject.WaistSize = waistSize;

    });

    $('#submit-btn6').on('click', function (event) {
        event.preventDefault();
        // console.log("clicked3")
        dataObject.Total += Total;

        // Store dataObject in session storage
        // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
        //     // Callback function executed after the dataObject is stored
        //     // Redirect to the next page after data is saved
        //     window.location.href = '8.html';
        // });
        saveDataAndRedirect('8.html')
    });

    $('input[name="waist_size_male"]').on('click', function () {
        // Get the value of the selected waist size
        var waistSizeText = $(this).val();

        // Assign scores based on the selected waist size text with measurements
        switch (waistSizeText) {
            case '<31 inch or <78.74 cm':
                Total = 0;
                break;
            case '31-34.9 inch or 78.74 – 88.67 cm':
                Total = 2;
                break;
            case '35-38.9 inch or 88.9 – 98.80 cm':
                Total = 3;
                break;
            case '≥39 inch or ≥99.06cm':
                Total = 4;
                break;
            default:
                dataObject.Total += 0; // Default to 0 if no matching waist size is found
        }

        // Update the WaistSize property of the data object with the selected value
        dataObject.WaistSize = waistSizeText;

        // Output the updated dataObject to the console (you can perform any action here)
        // console.log(dataObject);

    });

    $('#submit-btn7').on('click', function (event) {
        event.preventDefault();
        // console.log("clicked3")
        dataObject.Total += Total;

        // Store dataObject in session storage
        // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
        //     // Callback function executed after the dataObject is stored
        //     // Redirect to the next page after data is saved
        //     window.location.href = '8.html';
        // });
        saveDataAndRedirect('8.html')

    });
    $('#bmi-btn').on('click', function () {
        var win = window.open('https://nash24x7.com/bmi/', '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    })
    $('input[name="bmi"]').on('click', function () {
        // Get the value of the selected BMI range
        var bmiRange = $(this).val();

        // Assign scores based on the selected BMI range
        switch (bmiRange) {
            case '<23':
                Total = 0;
                break;
            case '23-24.9':
                Total = 2;
                break;
            case '25-26.9':
                Total = 3;
                break;
            case '≥27':
                Total = 4;
                break;
            default:
                dataObject.Total += 0; // Default to 0 if no matching BMI range is found
        }

        // Update the BMI property of the data object with the selected value
        dataObject.BMI = bmiRange;

        // Output the updated dataObject to the console (you can perform any action here)
        // console.log(dataObject);

    });

    $('#submit-btn8').on('click', function (event) {
        event.preventDefault();
        // console.log("clicked3")
        dataObject.Total += Total;

        // Store dataObject in session storage
        // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
        //     // Callback function executed after the dataObject is stored
        //     // Redirect to the next page after data is saved
        //     window.location.href = '9.html';
        // });
        saveDataAndRedirect('9.html')
    });


    $('input[name="diabetes"]').on('click', function () {
        // Get the value of the selected option (Yes or No)
        var diabetesAnswer = $(this).val();


        // Assign scores based on the selected option
        if (diabetesAnswer === 'Yes') {
            Total = 2;
        } else if (diabetesAnswer === 'No') {
            Total = 0;
        }

        // Update the Diabetes property of the data object with the selected value
        dataObject.Diabetes = diabetesAnswer;

        // Output the updated dataObject to the console (you can perform any action here)
        // console.log(dataObject);
    });

    $('#submit-btn9').on('click', function (event) {
        event.preventDefault();
        // console.log("clicked3")
        dataObject.Total += Total;

        // Store dataObject in session storage
        // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
        //     // Callback function executed after the dataObject is stored
        //     // Redirect to the next page after data is saved
        //     window.location.href = '10.html';
        // });
        saveDataAndRedirect('10.html')
    });


    $('input[name="hba1c"]').on('click', function () {
        // Get the value of the selected option (e.g., "<7", ">7", "Don't Know")
        var hba1cAnswer = $(this).val();


        // Assign scores based on the selected optio

        // Update the HbA1c property of the data object with the selected value
        dataObject.HbA1c = hba1cAnswer;

        // Output the updated dataObject to the console (you can perform any action here)
        // console.log(dataObject);


    });

    $('#submit-btn10').on('click', function (event) {
        event.preventDefault();
        // console.log("clicked3")
        dataObject.Total += Total;

        // Store dataObject in session storage
        // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
        //     // Callback function executed after the dataObject is stored
        //     // Redirect to the next page after data is saved
        //     window.location.href = '11.html';
        // });
        saveDataAndRedirect('11.html')
    });


    $('input[name="cholesterol"]').on('click', function () {
        // Get the value of the selected option (Yes or No)
        var cholesterolAnswer = $(this).val();


        // Assign scores based on the selected option
        if (cholesterolAnswer === 'Yes') {
            Total = 2;
        } else if (cholesterolAnswer === 'No') {
            Total = 0;
        }

        // Update the Cholesterol property of the data object with the selected value
        dataObject.Cholesterol = cholesterolAnswer;

        // Output the updated dataObject to the console (you can perform any action here)
        // console.log(dataObject);

    });

    $('#submit-btn11').on('click', function (event) {
        event.preventDefault();
        // console.log("clicked3")
        dataObject.Total += Total;

        // Store dataObject in session storage
        // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
        //     // Callback function executed after the dataObject is stored
        //     // Redirect to the next page after data is saved
        //     window.location.href = '12.html';
        // });
        saveDataAndRedirect('12.html')
    });

    $('input[name="physically_active"]').on('click', function () {
        // Get the value of the selected option (Yes or No)
        var physicallyActiveAnswer = $(this).val();


        // Assign scores based on the selected option
        if (physicallyActiveAnswer === 'Yes') {
            Total = 0;
        } else if (physicallyActiveAnswer === 'No') {
            Total = 1;
        }

        // Update the PhysicallyActive property of the data object with the selected value
        dataObject.PhysicallyActive = physicallyActiveAnswer;

        // Output the updated dataObject to the console (you can perform any action here)
        // console.log(dataObject);
    });

    $('#submit-btn12').on('click', function (event) {
        event.preventDefault();
        // console.log("clicked3")
        if (dataObject.Gender === 'male') {
            dataObject.Total += Total;

            // Store dataObject in session storage
            // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
            //     // Callback function executed after the dataObject is stored
            //     // Redirect to the next page after data is saved
            //     window.location.href = '13.html';
            // });
            saveDataAndRedirect('13.html')
        }
        else {
            dataObject.Total += Total;

            // Store dataObject in session storage
            // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
            //     // Callback function executed after the dataObject is stored
            //     // Redirect to the next page after data is saved
            //     window.location.href = '14.html';
            // });
            saveDataAndRedirect('14.html')
        }

    });

    $('input[name="drink_alcohol"]').on('click', function () {
        // Get the value of the selected option (Yes or No)
        var drinkAlcoholAnswer = $(this).val();

        // Assign scores based on the selected option
        if (drinkAlcoholAnswer === 'Yes') {
            Total = 1;
        } else if (drinkAlcoholAnswer === 'No') {
            Total = 0;
        }

        // Update the Drinkalcohol property of the data object with the selected value
        dataObject.Drinkalcohol = drinkAlcoholAnswer;

        // Output the updated dataObject to the console (you can perform any action here)
        // console.log(dataObject);
    });

    $('#submit-btn13').on('click', function (event) {
        event.preventDefault();

        // Calculate the total score from the dataObject
        var totalScore = dataObject.Total; // Assuming Total score is stored in the dataObject

        // Update the lblResult element with the total score
        $("#lblResult").text("Total Score: " + totalScore);
        console.log("total= ", totalScore);
        dataObject.Total += Total;

        if (dataObject.Total > 7) {

            // Store dataObject in session storage
            // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
            //     // Callback function executed after the dataObject is stored
            //     // Redirect to the next page after data is saved
            //     window.location.href = '15.html';
            // });
            SaveDataToServer('15.html')
        } else {


            // Store dataObject in session storage
            // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
            //     // Callback function executed after the dataObject is stored
            //     // Redirect to the next page after data is saved
            //     window.location.href = '16.html';
            // });
            SaveDataToServer('16.html')
        }
    });


    $('input[name="menopause"]').on('click', function () {
        // Get the value of the selected option (Yes or No)
        var menopauseAnswer = $(this).val();


        // Assign scores based on the selected option
        if (menopauseAnswer === 'Yes') {
            Total = 1;
        } else if (menopauseAnswer === 'No') {
            Total = 0;
        }

        // Update the Menopause property of the data object with the selected value
        dataObject.Menopause = menopauseAnswer;

        // Output the updated dataObject to the console (you can perform any action here)
        // console.log(dataObject);
    });

    $('#submit-btn14').on('click', function (event) {
        event.preventDefault();

        // Calculate the total score from the dataObject
        var totalScore = dataObject.Total; // Assuming Total score is stored in the dataObject

        // Update the lblResult element with the total score
        $("#lblResult").text("Total Score: " + totalScore);
        console.log("total= ", totalScore);
        dataObject.Total += Total;
        if (dataObject.Total > 7) {


            // Store dataObject in session storage
            // localStorage.setItem('dataObject', JSON.stringify(dataObject), function () {
            //     // Callback function executed after the dataObject is stored
            //     // Redirect to the next page after data is saved
            //     window.location.href = '15.html';
            // });
            SaveDataToServer('15.html')
        } else {


            // Store dataObject in session storage
            SaveDataToServer('16.html')
        }
    });

    $(document).ready(function () {
        // Retrieve total score from local storage
        var dataFinal = localStorage.getItem('dataObject');

        if (dataFinal) {
            // Parse the JSON string back to an object
            dataFinal = JSON.parse(dataFinal);

            // Display total score if it exists
            if (dataFinal.Total !== undefined) {
                console.log("dataFinal.Total =", dataObject);
                $("#lblResult").text(dataFinal.Total);
                 updateSlider(dataFinal.Total); // ADD THIS LINE
            } else {
                console.log("Total score is not defined in dataFinal.");
            }
        } else {
            console.log("No dataObject found in local storage.");
        }
    });

    Total = parseInt(localStorage.getItem('total'));
    console.log("TOtal = ", Total);



    $('#prev-1').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('index.html');
        // window.location.href = 'index.html'; // Assuming the first page is the index.html
    });

    $('#prev-2').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('index.html');
    });

    $('#prev-3').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('2.html');
    });

    $('#prev-4').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('3.html');
    });

    $('#prev-5').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('4.html');
    });

    $('#prev-6').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('5.html');
    });

    $('#prev-8').on('click', function (event) {
        event.preventDefault();
        if (dataObject.Gender === 'male') {
            dataObject.Total -= Total;
            saveDataAndRedirect('7.html');
        }
        else {
            dataObject.Total -= Total;
            saveDataAndRedirect('6.html');
        }
    });

    $('#prev-7').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('5.html');
    });

    $('#prev-9').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('8.html');
    });

    $('#prev-10').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('9.html');
    });

    $('#prev-11').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('10.html');
    });

    $('#prev-12').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('11.html');
    });

    $('#prev-13').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('12.html');
    });

    $('#prev-14').on('click', function (event) {
        event.preventDefault();
        dataObject.Total -= Total;
        saveDataAndRedirect('12.html');
    });

    //slider 

    function updateSlider(score) {
        // Calculate position (score out of 15, converted to percentage)
        let position = Math.min(Math.max(score / 15 * 100, 0), 100);

        // Position the "You are here" indicator
        $('#youAreHere').css('left', position + '%');
        $('#arrowIndicator').css('left', position + '%');
    }


});