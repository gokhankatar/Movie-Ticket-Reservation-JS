// ! Variables

const container = document.querySelector('.container');
const amount = document.getElementById('amount');
const count = document.getElementById('count')
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

// ! Functions & Other Variables For Local Storage

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
    if ((e.target.classList.contains('seat')) && (!e.target.classList.contains('reserved'))) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function (e) {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeatCount = container.querySelectorAll(".seat.selected").length;
    const price = select.value;

    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * price;

    // Local storage variables
    const selectedSeats = document.querySelectorAll(".seat.selected");
    const selectedSeatArr = [];
    const seatsArr = [];

    // element transfer
    selectedSeats.forEach(function (seat) {
        selectedSeatArr.push(seat)
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat)
    });

    let selectedSeatIndexes = selectedSeatArr.map(function (seat) {
        return seatsArr.indexOf(seat)
    });
    
    saveToLocalStorage(selectedSeatIndexes);

}


// ! Local Storage (Set)

function saveToLocalStorage(indexes) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexes));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
};

// ! Local Storage (Get)

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
};