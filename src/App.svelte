<!-- src/App.svelte -->
<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Welcome from './routes/Inicio.svelte';
  import Login from './routes/Login.svelte';
</script>

<Router>
  <main>
    <Route path="/" component={Welcome} />
    <Route path="/login" component={Login} />
  </main>
</Router>
