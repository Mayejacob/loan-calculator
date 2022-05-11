// listen to submit
document.getElementById('loan-form').addEventListener('submit', function(e){

    // hide results
    document.getElementById('results').style.display = 'none';
    // show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

// calculate result
function calculateResults(e){
    // console.log('Calculating.....');
    // UI variables
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    // check if monthly is finite
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        // show results
        document.getElementById('results').style.display = 'block';
        // hide spinner
        document.getElementById('loading').style.display = 'none';
        
    }else{
        // console.log('Please Check your Numbers');
        showError('Please Check your Numbers');
    }

    e.preventDefault();
}

// sfow error
function showError(error){
      // hide results
      document.getElementById('results').style.display = 'none';
      // hide spinner
      document.getElementById('loading').style.display = 'none';

    // create Div
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card-content');
    // const cardAction = document.querySelector('.card-action');
    const heading = document.querySelector('.heading');

    // Add Class
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error aboive heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// clear error
function clearError(){
    document.querySelector('.alert').remove();
}