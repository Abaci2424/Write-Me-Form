const form = document.forms['form'];
const button = document.querySelector('#button');

const inputArr = Array.from(form);
const validInputArr = [];

inputArr.forEach((el) => {
  if(el.hasAttribute('data-reg')) {
    el.setAttribute('is-valid', '0');
    validInputArr.push(el);
  }
});


console.log(validInputArr);

form.addEventListener('input', inputHandler);
form.addEventListener('submit', formCheck);


function inputHandler({target}) {
  if (target.hasAttribute('data-reg')) {
     inputCheck (target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute('data-reg');
  const reg = new RegExp(inputReg);
 
  if (reg.test(inputValue)) {
    el.style.borderBottom = '2px solid  #59ABE3';
    el.setAttribute('is-valid', '1')
  } else {
    el.style.borderBottom = '2px solid #DC143C ';
    el.setAttribute('is-valid', '0')
  }

}

function formCheck(e) {
  e.prevetDafault();
  const isAllValid = [];
  validInputArr.forEach((el) => {
    isAllValid.push(el.getAttribute('is-valid'));
  });
   const isValid = isAllValid.reduce((acc, current) => {
    return acc && current;
   });
   if (!Boolean(Number(isValid))) {
    alert('Заполните поля правильно!')
    return;
   }
   formSubmit();
}

async function formSubmit () {
const data = serializeForm(form);
const response = await sendData(date);
if ( response.ok) {
  let result = await response.json();
  alert(result.message);
  formReset();
} else {
  alert('error code' + response.status);
}
}

function selializeForm(formNode) {
  return new FormData(form);   
}

async function sendDate(date) {
  return await fetch('send_mail.php', {
    method: "POST" ,
    body: date,
  });
}

function formReset() {
  form.reset();
  validFormArr.forEach((el) => {
    el.setAttribute('is-valid',0);
    el.style.borderBottom = 'none';
  })
}