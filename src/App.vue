<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Brui</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/">Menu</b-nav-item>
          <b-nav-item to="taps">Taps</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view class="container-fluid"/>
  </div>
</template>

<style>
</style>
