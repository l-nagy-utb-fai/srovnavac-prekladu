<script setup>
  import { ref } from 'vue';
  
  const userInput = ref('');
  const resultCZtoES = ref('');
  const resultCZtoEN = ref('');
  const resultENtoES = ref('');
  const resultCZtoDE = ref('');
  const resultDEtoES = ref('');

  const translate = async (text, from, to) => {
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('Z ${from} do ${to}:', data);
    if (data && data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    } else {
      console.error('Translation error:', data);
      return 'Chyba';
    } 
  };

  const translateCZtoES = async () => {
    resultCZtoES.value = await translate(userInput.value, 'cs', 'es');
  };

  const translateCZtoEN = async () => {
    resultCZtoEN.value = await translate(userInput.value, 'cs', 'en');
  };

  const translateENtoES = async () => {
    resultENtoES.value = await translate(resultCZtoEN.value, 'en', 'es');
  };

  const translateCZtoDE = async () => {
    resultCZtoDE.value = await translate(userInput.value, 'cs', 'de');
  };

  const translateDEtoES = async () => {
    resultDEtoES.value = await translate(resultCZtoDE.value, 'de', 'es');
  };

  const translateAll = async () => {
    await translateCZtoES();
    await translateCZtoEN();
    await translateENtoES();
    await translateCZtoDE();
    await translateDEtoES();
  };
</script>

<template>
  <main>
    <div class="card m-3 col-10 mx-auto">
      <div class="card-body" style="background-color: #bdc1d9">
        <div class="form-floating mb-3">
          <div class="form-floating mb-3">
            <input v-model="userInput" type="text" class="form-control" id="userInput" placeholder="Text for translation..." style="background-color: #e8e9f0;">
            <label for="userInput">Text k překladu:</label>
            <div class="card m-3 col-4 mx-auto">
              <button @click="translateAll" type="button" class="btn btn-lg" style="background-color: #5a639b" >Přeložit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3 col-10 mx-auto">
      <div class="card-body" style="background-color: #bdc1d9;">
        <div class="container text-center">
          <div class="row align-items-start">
            
            <div class="col">
              <div class="card mt-3">
                <div class="card-body" style="background-color: #e8e9f0; ">
                  <strong>Překlad přímo do španělštiny:</strong>
                  <div>
                    {{ resultCZtoES }}
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mt-3">
                <div class="card-body" style="background-color: #e8e9f0;">
                <strong>Překlad přes angličtinu:</strong>
                  <div>
                    {{ resultENtoES }}
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mt-3">
                <div class="card-body" style="background-color: #e8e9f0;">
                <strong>Překlad přes němčinu:</strong>
                  <div>
                    {{ resultDEtoES }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-2 col-3 mx-auto">
      <div class="card-body" style="background-color: #bdc1d9;">
        <div class="container text-center">
          <div class="mb-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1024px-Bandera_de_Espa%C3%B1a.svg.png" alt="SpanishFlag" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
