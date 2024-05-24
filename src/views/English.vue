<script setup>
  import { ref } from 'vue';
  
  const userInputText = ref('');
  const resultCZtoEN = ref('');
  const resultCZtoDE = ref('');
  const resultDEtoEN = ref('');
  const resultCZtoES = ref('');
  const resultEStoEN = ref('');
  const userInputWord = ref('');
  const resultDic = ref('');

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

  const translateCZtoEN = async () => {
    resultCZtoEN.value = await translate(userInputText.value, 'cs', 'en');
  };

  const translateCZtoDE = async () => {
    resultCZtoDE.value = await translate(userInputText.value, 'cs', 'de');
  };

  const translateDEtoEN = async () => {
    resultDEtoEN.value = await translate(resultCZtoDE.value, 'de', 'en');
  };

  const translateCZtoES = async () => {
    resultCZtoES.value = await translate(userInputText.value, 'cs', 'es');
  };

  const translateEStoEN = async () => {
    resultEStoEN.value = await translate(resultCZtoES.value, 'es', 'en');
  };

  const translateAll = async () => {
    await translateCZtoEN();
    await translateCZtoDE();
    await translateDEtoEN();
    await translateCZtoES();
    await translateEStoEN();
  };

  const translateDic = async() => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${userInputWord.value}`;
    try{
      const response = await fetch(url);
      const data = await response.json();
      console.log('Answer', data);
      if (data && Array.isArray(data) && data.length > 0 && data[0].meanings && data[0].meanings.length > 0) {
        resultDic.value = data[0].meanings.map(meaning => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map(def => def.definition),
          synonyms: meaning.synonyms || []
        }));
      } else {
        console.error('Translation error:', data);
        resultDic.value = 'Chyba';
      }
    } catch (error) {
      console.error('Fetch error:', error);
      resultDic.value = 'Chyba';
    }
  };
</script>

<template>
  <main>
    <div class="card m-3 col-10 mx-auto">
      <div class="card-body" style="background-color: #bdc1d9">
        <div class="form-floating mb-3">
          <input v-model="userInputText" type="text" class="form-control" id="userInput" placeholder="Text for translation..." style="background-color: #e8e9f0;">
          <label for="userInput">Text k překladu:</label>
          <div class="card m-3 col-4 mx-auto">
            <button @click="translateAll" type="button" class="btn btn-lg" style="background-color: #5a639b" >Přeložit</button>
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
                  <strong>Překlad přímo do angličtiny:</strong>
                  <div>
                    {{ resultCZtoEN }}
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mt-3">
                <div class="card-body" style="background-color: #e8e9f0;">
                  <strong>Překlad přes němčinu:</strong>
                  <div>
                    {{ resultDEtoEN }}
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card mt-3">
                <div class="card-body" style="background-color: #e8e9f0;">
                  <strong>Překlad přes španělštinu:</strong>
                  <div>
                    {{ resultEStoEN }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>

    <div class="card m-3 col-6 mx-auto">
      <div class="card-body" style="background-color: #888fb8">
        <div class="form-floating mb-3">
          <input v-model="userInputWord" type="text" class="form-control" id="userInput2" placeholder="Word for dictionary" style="background-color: #e8e9f0">
          <label for="userInput2">Vyhledej slovo ve slovníku:</label>
        </div>
        <div class="card m-3 col-4 mx-auto">
          <button @click="translateDic" type="button" class="btn btn-lg" style="background-color: #bdc5f6" >Vyhledat</button>
        </div>
        <div class="card mt-3">
          <div class="card-body" style="background-color: #e8e9f0;">
            <strong>Dictionary Definition:</strong>
            <div v-for="(meaning, index) in resultDic" :key="index" class="mb-3">
              <strong>{{ meaning.partOfSpeech }}</strong>
              <ul>
                <li v-for="(definition, defIndex) in meaning.definitions" :key="defIndex">
                  {{ definition }}
                </li>
              </ul>
              <div v-if="meaning.synonyms.length > 0">
                <strong>Synonyms:</strong>
                <ul>
                  <li v-for="(synonym, synIndex) in meaning.synonyms" :key="synIndex">
                    {{ synonym }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
