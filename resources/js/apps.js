const contactForm = document.querySelector('.contact-form');
let cname = document.getElementById('cname');
let cemail = document.getElementById('cemail');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    let formData = {
        cname: cname.value,
        cemail: cemail.value,
        subject: subject.value,
        message: message.value
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email sent');
            cname.value = '';
            cemail.value = '';
            subject.value = '';
            message.value = '';
        }
        else
        {
            alert('Something went wrong!');
            console.log(xhr)
        }
    }
    xhr.send(JSON.stringify(formData))
})
console.log('HELLOW')
console.log('HELLO WORLD')
console.log('HELLO WORLD GOODBYE')