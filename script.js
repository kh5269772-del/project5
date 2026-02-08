
let male = document.getElementById('male')
let female = document.getElementById('female')
let height = document.getElementById('height')
let weight = document.getElementById('weight')
let total = document.getElementById('total')
let age = document.getElementById('age')
let btn = document.getElementById('btn')
let moderat = document.getElementById('moderat')
let little = document.getElementById('little')
let high = document.getElementById('high')
let tdee = document.getElementById('tdee')
let text = document.getElementById('text')
let loop = document.getElementById('loop')
// let download = document.getElementById('download')

let mode = 'male'
let moodtdee = 'moderat'
let myChart ;

btn.addEventListener('click', function () {
  totelfemale()
  datano()



})





function totelfemale() {
  let ageVal = +age.value;
  let weightVal = +weight.value;
  let heightVal = +height.value;
  let bmr = 0;
  let tdeeup = 0;

  if (ageVal > 0 && heightVal > 0 && weightVal > 0) {
    if (mode === 'male') {
      bmr =
        (10 * weightVal) +
        (6.25 * heightVal) -
        (5 * ageVal) + 5
    } else {
      bmr =
        (10 * weightVal) +
        (6.25 * heightVal) -
        (5 * ageVal) - 161
    }






    if (moodtdee === 'moderat') {
      tdeeup = bmr * 1.55;
    } else if (moodtdee === 'little') {
      tdeeup = bmr * 1.375;
    } else if (moodtdee === 'high') {
      tdeeup = bmr * 1.725;
    } else {
      tdeeup = bmr * 1.55;
    }
    total.textContent = Math.round(tdeeup) + ' kcal';
    console.log('TDEE: ', mode, tdeeup);
    text.textContent = '↓ لقد تم الامر بنجاح من فضلك انظر الي النتيجة في الاسفل '

    let theproten = (weightVal * 2);
    let thephate = (tdeeup * 0.25) / 9;
    let thecap = (tdeeup - (theproten * 4) - (thephate * 9));
    let thecarp = (thecap / 4)
    let thewater = (weightVal * 0.033)
    let thedata = {
      thetdeeup: Math.round(tdeeup),
      proten: Math.round(theproten),
      fate: Math.round(thephate),
      carp: Math.round(thecarp),
      water: thewater,
      thcuw: (thewater * 4),
      // watercup: Math.ceil(thcuw)
    }
    let p = document.getElementById('p')
    p.textContent = thedata.proten;
    let c = document.getElementById('c')
    c.textContent = thedata.carp;
    let f = document.getElementById('f')
    f.textContent = thedata.fate;
    let wb = document.getElementById('wb')
    wb.textContent = thedata.water.toFixed(2);
    let wc = document.getElementById('wc')
    wc.textContent = Math.ceil(thedata.thcuw);
    console.log(thedata)


    // -----------------------js----------------------

    const config = {
      type: 'doughnut',
      data: {
          labels: ['.fats «g»', '.protein «g»', '.carb «g»'],
          datasets: [{
            data: [thedata.fate, thedata.proten, thedata.carp],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: { position: 'top' } 
        }
      }
    };

    const ctx = document.getElementById('myChart');

 
    if (myChart) {
        myChart.destroy(); 
        
        //حذف البيانات 
    }


    myChart = new Chart(ctx, config);

  } else {
    text.textContent = 'من فضلك أدخل كل القيم بشكل صحيح'
    total.textContent = 0
  }




}




function datano() {
  age.value = '';
  height.value = '';
  weight.value = '';

}


male.onclick = function () {
  mode = 'male'
}
female.onclick = function () {
  mode = 'female'
}

tdee.onchange = function () {
  moodtdee = this.value
  console.log('moodtdee =:', moodtdee);

}

loop.addEventListener('click', function () {
  window.scroll({
    top: 0,
    behavior: "smooth"

  })
})



document.getElementById('download').onclick = function() {
  const node = document.getElementById('mathdown');
  
  domtoimage.toPng(node)
    .then(function (dataUrl) {
      // const img = new Image();
      // img.src = dataUrl;
      // document.body.appendChild(img);
      const link = document.createElement('a');
  link.download = 'image.png';
  link.href = dataUrl;
  link.click();
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}