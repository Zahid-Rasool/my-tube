<template>
  <div
    v-if="dataReady"
    id="app"
    :class="{
      hideOutlines: hideOutlines,
      isLocaleRightToLeft: isLocalRightToLeft
    }"
  >
    <top-nav ref="topNav" />
    <side-nav ref="sideNav" />
    <ft-flex-box class="flexBox routerView" role="main">
      <div v-if="showUpdateBanner || showBlogBanner" class="bannerWrapper">
        <ft-notification-banner
          v-if="showUpdateBanner"
          class="banner"
          :message="updateBannerMessage"
          role="link"
          @click="handleUpdateBannerClick"
        />
        <ft-notification-banner
          v-if="showBlogBanner"
          class="banner"
          :message="blogBannerMessage"
          role="link"
          @click="handleBlogBannerClick"
        />
      </div>
      <transion v-if="dataReady" mode="Out-in" name="fade">
        <router-view ref="router" class="routerView" />
      </transion>
    </ft-flex-box>
  </div>
</template>

<script src="./App.ts" />
<style scoped lang="scss" src="./App.scss" />
<style src="./theme.scss" />
