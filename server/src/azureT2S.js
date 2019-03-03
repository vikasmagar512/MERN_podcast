

// Make sure to update User-Agent with the name of your resource.
// You can also change the voice and output formats. See:
// https://docs.microsoft.com/azure/cognitive-services/speech-service/language-support#text-to-speech
export function saveAudio(text, accessToken) {
    // const text = "The fault, dear Brutus, Vikas is not in our stars, But in ourselves, Vikas that we are underlings. Vikas";

    // Create the SSML request.
  const xml_body = xmlbuilder.create('speak')
        .att('version', '1.0')
        .att('xml:lang', 'en-us')
        .ele('voice')
        .att('xml:lang', 'en-us')
        .att('name', 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)')
        .txt(text)
        .end();
    // Convert the XML into a string to send in the TTS request.
  let body = xml_body.toString();

  let options = {
    method: 'POST',
    baseUrl: 'https://westus.tts.speech.microsoft.com/',
    url: 'cognitiveservices/v1',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'cache-control': 'no-cache',
            // 'User-Agent': 'voxsnap1',
      'User-Agent': process.env.AZURE_USER_AGENT_RESOURCE_NAME,
      'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
      'Content-Type': 'application/ssml+xml',
    },
    body,
  };
    // This function makes the request to convert speech to text.
    // The speech is returned as the response.
  function convertText(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Converting text-to-speech. Please hold...\n");
    } else {
      throw new Error(error);
    }
    console.log("Your file is ready.\n");
  }
    // Pipe the response to file.
  return new Promise((resolve, reject) => {
    // request(options, convertText).pipe(fs.createWriteStream('sample2.wav'));
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log("Converting text-to-speech. Please hold...\n");
      } else {
        throw new Error(error);
      }
      console.log("Your file is ready.\n");
    }).pipe(fs.createWriteStream('sample2.wav'));
  });
}

// https://azure.microsoft.com/en-us/try/cognitive-services/my-apis/?apiSlug=speech-services&country=India&allowContact=true&fromLogin=True
// End point: https://westus.api.cognitive.microsoft.com/sts/v1.0

export function textToSpeech(text) {
  const subscriptionKey = process.env.AZURE_KEY1;

  let options = {
    method: 'POST',
    uri: 'https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
  };
    // This function retrieve the access token and is passed as callback
    // to request below.
  /* function getToken(error, response, body) {
    console.log("Getting your token...\n");
    if (!error && response.statusCode === 200) {
            // This is the callback to our saveAudio function.
            // It takes a single argument, which is the returned accessToken.
            // try {
                // resolve(JSON.parse(body).data.available_balance);
      resolve(text, body);
            // } catch(e) {
            //     reject(e);
            // }
      // saveAudio(text,body);
    } else {
      if (error) return reject(err);
      // throw new Error(error);
    }
  }*/
  return new Promise((resolve, reject) => {
    // request(options, getToken);
    request(options, (error, response, body) => {
      console.log("Getting your token...\n");
      if (!error && response.statusCode === 200) {
            // This is the callback to our saveAudio function.
            // It takes a single argument, which is the returned accessToken.
            // try {
            // resolve(JSON.parse(body).data.available_balance);
        resolve(text, body);
            // } catch(e) {
            //     reject(e);
            // }
            // saveAudio(text,body);
      } else {
        if (error) return reject(error);
            // throw new Error(error);
      }
    });
  });
}
