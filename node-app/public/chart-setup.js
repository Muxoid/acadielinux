
async function fetchDataFromAPI() {
    const apiURL = '/api/bandwidth'; 
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data from API:', error);
      return null;
    }
  }
  

  async function prepareChartData(apiData, timeIncrement) {
    // Assuming apiData is the parsed JSON response from your API
    // And assuming you want to use the first interface and its monthly data
    if (!apiData) {
        console.error('Hour data is not available');
        return { labels: [], downloadData: [], uploadData: [] };
      }

   
    let hours;
    let formattedHour;
    let date;
    const datatime = [];
    const rxData = [];
    const txData = [];
    const maxBandwidth = [];

    if (timeIncrement === "hours"){
        apiData.forEach(hour => {
            date = new Date(hour.timestamp * 1000);
            hours = date.getHours();
            formattedHour = ('0' + hours).slice(-2)  + ':' + ('0' + date.getMinutes()).slice(-2);
            datatime.push(formattedHour)
            rxData.push(hour.rx * 0.0000000009);
            txData.push(hour.tx * 0.0000000009);
            maxBandwidth.push(225);
        });
    } 
    
    if (timeIncrement === "minutes"){
        let startIndex = Math.max(apiData.length - 10, 0); // Ensure it's not negative
        apiData.slice(startIndex).forEach(fiveminute => {
            date = new Date(fiveminute.timestamp * 1000);
            hours = date.getHours();
            formattedHour = ('0' + hours).slice(-2)  + ':' + ('0' + date.getMinutes()).slice(-2);
            datatime.push(formattedHour)
            rxData.push(fiveminute.rx * 0.0000000009);
            txData.push(fiveminute.tx * 0.0000000009);
            maxBandwidth.push(225/60);
        });
    }
    
    
    
    
    return { maxBandwidth, datatime, rxData, txData };
  }
  


  

  new Chart(
    document.getElementById('minuteBandwidth').getContext('2d'),
    {
      type: 'line',
      data: {
          labels: datatime, // Dynamically set labels
          datasets: [{
              label: 'Download',
              data: rxData, // Dynamically set download data
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
          }, {
              label: 'Upload',
              data: txData, // Dynamically set upload data
              fill: false,
              borderColor: 'rgb(75, 100, 192)',
              tension: 0.1
          }, {
            label: 'Max',
            data: maxBandwidth, // Dynamically set upload data
            fill: false,
            borderColor: 'rgb(246, 42, 42)',
            tension: 0.1
        }, 
        ]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
    
    

 
  
