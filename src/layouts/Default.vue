<template>
  <div class="layout">
    <header class="header">
      <strong class="logo-wrap">
        <g-link class="logo" to="/"><img class="logo-img" src="../images/eiq-logo.png" alt="">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Triage</g-link>
        <g-link class="nav__link" to="/airdatas/">ClaimView</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
body {
  font-family:Roboto,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
  background-color: rgb(248, 248, 248);
}
p{
  margin: 0;
  padding: 0;
}

.layout {
  max-width:1480px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}
strong.logo-wrap a {
    display: flex;
    align-items: center;
    justify-content: center;
}
img.logo-img {
    margin-right: 15px;
}

.nav__link {
  margin-left: 20px;
}
a.logo.active {
    color: #2C60D2;
    text-decoration: none;
}
a.nav__link {
    color: #2C60D2;
    text-decoration: none;
}
</style>
