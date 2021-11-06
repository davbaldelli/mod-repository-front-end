<template>
  <b-container fluid>
    <b-row>
      <b-col md="2" sm="1" xl="3"></b-col>
      <b-col cols="12" md="8" sm="10" xl="6">
        <b-jumbotron
            class="py-3 py-sm-4 py-lg-5 mb-2 text-left"
            header="AC Mod Repository"
            lead="A collection of quality mods"
        ></b-jumbotron>
      </b-col>
      <b-col md="2" sm="1" xl="3"></b-col>
    </b-row>
    <b-row>
      <b-col md="2" sm="1" xl="3"></b-col>
      <b-col cols="12" md="8" sm="10" xl="6">
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
      </b-col>
      <b-col md="2" sm="1" xl="3"></b-col>
    </b-row>
  </b-container>
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
