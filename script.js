'use strict';

const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleUserBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');

let data = [];

// Fetch random user and add money
async function getRandonUser() {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Filter only millionaries
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, cur) => (acc += cur.money), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `
    <h3>
      Total wealth: <strong>${formatMoney(wealth)}</strong>
    </h3>
  `;
  main.append(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}
// Update DOM
function updateDOM(provideData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

  provideData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.append(element);
  });
}

// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

getRandonUser();
getRandonUser();
getRandonUser();

// Event Listeners
addUserBtn.addEventListener('click', getRandonUser);
doubleUserBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
