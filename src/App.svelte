<!-- src/App.svelte -->
<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Welcome from './routes/Inicio.svelte';
  import Login from './routes/Login.svelte';
</script>

<Router>
  <main class="principal_main">
    <Route path="/" component={Welcome} />
    <Route path="/login" component={Login} />
  </main>
</Router>

<style>
  .principal_main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #f3f3f3;
    padding: 0px;
  }
</style>