<template>
  <div class="container">
    <b-jumbotron
        class="mb-2 mt-2 text-left"
        header="AC Mod Repository"
    ></b-jumbotron>
    <div class="text-center">
      <h5 class="mb-2">
        Benvenuti a tutti.<br/>
        Questo sito è una raccolta di mod di qualità, un tentativo di riunire nello stesso punto le migliori macchine e
        piste sparse sul web.<br/>
        Le mod qui presenti sono rimaste inalterate, e, ove possibile, sono presenti i riferimenti ai rispettivi autori.<br/>
      </h5>
      <h5 class="mb-2">
        Se ti piace il nostro lavoro e vorresti premiarci ti invito a fare una piccola donazione
        <a href="https://paypal.me/teamItaliaracing?locale.x=it_IT" target="_blank">qui</a>
      </h5>
      <h5>
        Se invece siete in ricerca di una comunità dove poter girare in compagnia vi invitiamo sul nostro gruppo <a
          href="https://discord.gg/5HTA8xZgTA"
          target="_blank">discord</a>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
