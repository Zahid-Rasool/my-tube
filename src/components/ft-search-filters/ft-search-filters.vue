<template>
  <div>
    <div class="searchFilterInner">
      <h2 class="center">
        Search Filters
        <!--{{ $t("Search Filters.Search Filters") }}-->
      </h2>
      <ft-flex-box class="radioFlexBox">
        <!--:title="$t('Search Fitrers.Sort By.Sort By')"-->
        <ft-radio-button
          ref="sortByRadio"
          title="Sort By"
          :labels="sortByLabels"
          :values="sortByValues"
          class="searchRadio"
          @change="updateSortBy"
        />
        <!--:title="$t('Search Fitrers.Time.Time')"-->
        <ft-radio-button
          ref="timeRadio"
          title="Time"
          :labels="timeLabels"
          :values="timeValues"
          class="searchRadio"
          @change="updateTime"
        />
        <!--:title="$t('Search Fitrers.Type.Type')"-->
        <ft-radio-button
          ref="typeRadio"
          title="Type"
          :labels="typeLabels"
          :values="typeValues"
          class="searchRadio"
          @change="updateType"
        />
        <!--:title="$t('Search Fitrers.Duration.Duration')"-->
        <ft-radio-button
          ref="durationRadio"
          title="Duration"
          :labels="durationLabels"
          :values="durationValues"
          class="searchRadio"
          @change="updateDuration"
        />
      </ft-flex-box>
    </div>
  </div>
</template>

<script src="./ft-search-filters.ts" />
<style scoped lang="scss" src="./ft-search-filters.scss" />
