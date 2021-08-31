async function getIP() {
    const request = await fetch('https://api.ipify.org/?format=json')
    const response = await request.json()
    return response.ip
}


getIP()
.then(res => {
    getINFO(res)
    .then(res => {
        renderData(res)
    })
})

async function getINFO(IP) {
    let request
        request = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_Q7DDGRbrunDXAK6faakQsvTSrgVow&ipAddress=${IP}`)
    const res = await request.json()
    return {ip: res.ip, location: res.location.region, timezone: res.location.timezone, isp: res.isp, lon: res.location.lng, lat: res.location.lat}
}

async function getDomainINFO(IP) {
    let request
        request = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_Q7DDGRbrunDXAK6faakQsvTSrgVow&domain=${IP}`)
    const res = await request.json()
    return {ip: res.ip, location: res.location.region, timezone: res.location.timezone, isp: res.isp, lon: res.location.lng, lat: res.location.lat}
}


function isValidIP(str) {
  const reg = /^(0|[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5]|2[0-4][0-9])\.(0|[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5]|2[0-4][0-9])\.(0|[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5]|2[0-4][0-9])\.(0|[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-5][0-5]|2[0-4][0-9])$/
  return reg.test(str)
}


 const mymap = L.map('mapid').setView([0, 0], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VwZXJhZG1pbnJvb3QiLCJhIjoiY2tzem95djZvMnc2YjJxb2QwdnlwdjI4bCJ9.96GqZt4gzYDYCAKBYYB9Ag', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic3VwZXJhZG1pbnJvb3QiLCJhIjoiY2tzem95djZvMnc2YjJxb2QwdnlwdjI4bCJ9.96GqZt4gzYDYCAKBYYB9Ag'
      }).addTo(mymap);

      const myIcon = L.icon({
          iconUrl: 'images/icon-location.svg',
          iconSize: [46, 56],
          iconAnchor: [22, 94],
        });
        const marker = L.marker([50.505, 30.57], { icon: myIcon }).addTo(mymap);

const ip = document.querySelector('#ip')
const locations = document.querySelector('#location')
const timezoneS = document.querySelector('#timezone')
const isp = document.querySelector('#isp')

function renderData(res) {
    ip.textContent = res.ip
    locations.textContent = res.location
    timezoneS.textContent = `UTC ${res.timezone}`
    isp.textContent = res.isp
    const {lon, lat} = res
    marker.setLatLng([lat,lon])
    mymap.setView([lat,lon], 13)
}

const inputData = document.querySelector('#inputdata')
const btn = document.querySelector('#btn')

btn.addEventListener('click', ClickData)

inputData.addEventListener('keydown', e => {
    console.log()
    if(e.key == 'Enter') ClickData()
})

document.forms[0].addEventListener('submit', e => {
    e.preventDefault()
})

function ClickData() {
    const txt = inputData.value
    const txt2 = txt.replaceAll(/\s/g,'')
    if(isValidIP(txt2)) {
        getINFO(txt2)
        .then(res => {
            renderData(res)
        })
    } else {
        getDomainINFO(txt2)
        .then(res => {
            renderData(res)
        })
    }
}