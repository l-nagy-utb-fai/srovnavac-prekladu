<script setup>
  import { ref } from 'vue';
  
  const userInput = ref('');
  const resultCZtoDE = ref('');
  const resultCZtoEN = ref('');
  const resultENtoDE = ref('');
  const resultCZtoES = ref('');
  const resultEStoDE = ref('');

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

  const translateCZtoDE = async () => {
    resultCZtoDE.value = await translate(userInput.value, 'cs', 'de');
  };

  const translateCZtoEN = async () => {
    resultCZtoEN.value = await translate(userInput.value, 'cs', 'en');
  };

  const translateENtoDE = async () => {
    resultENtoDE.value = await translate(resultCZtoEN.value, 'en', 'de');
  };

  const translateCZtoES = async () => {
    resultCZtoES.value = await translate(userInput.value, 'cs', 'es');
  };

  const translateEStoDE = async () => {
    resultEStoDE.value = await translate(resultCZtoES.value, 'es', 'de');
  };

  const translateAll = async () => {
    await translateCZtoDE();
    await translateCZtoEN();
    await translateENtoDE();
    await translateCZtoES();
    await translateEStoDE();
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
                  <strong>Překlad přímo do němčiny:</strong>
                  <div>
                    {{ resultCZtoDE }}
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mt-3">
                <div class="card-body" style="background-color: #e8e9f0;">
                  <strong>Překlad přes angličtinu:</strong>
                  <div>
                    {{ resultENtoDE }}
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mt-3">
                <div class="card-body" style="background-color: #e8e9f0;">
                  <strong>Překlad přes španělštinu:</strong>
                  <div>
                    {{ resultEStoDE }}
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
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" alt="GermanFlag" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
