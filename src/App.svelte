<!-- src/App.svelte -->
<script>
  import { Router, Route, Link } from 'svelte-routing';
  import Welcome from './routes/Inicio.svelte';
  import Login from './routes/Login.svelte';
  import Profile from './routes/+page.svelte';
  import Dashboard from './routes/Dashboard.svelte';
</script>

<Router>
  <!-- <main class="principal_main"> -->
  <svelte:fragment>
    <Route path="/" component={Welcome} />
    <Route path="/login" component={Login} />
    <Route path="/profile" component={Profile} />
    <Route path="/dashboard" component={Dashboard} />
  </svelte:fragment>
  <!-- </main> -->
</Router>