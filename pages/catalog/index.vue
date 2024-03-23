<script setup>
const route = useRoute();
const router = useRouter();
const sortPage = ref(0);
const currentPage = ref(1);
const pageSize = ref(4);

console.log(route.params.id);
if (router.currentRoute.value.query.page != undefined) {
  currentPage.value = parseInt(router.currentRoute.value.query.page);
  sortPage.value = currentPage.value * pageSize.value - pageSize.value;
}
const { data: project, refresh } = await useFetch("/api/courses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  body: { ParamsCat: route.params.id, sortPage, pageSize },
});

const handleCurrentChange = (val) => {
  if (val == 1) {
    sortPage.value = 0;
  } else {
    sortPage.value = val * pageSize.value - pageSize.value;
  }
  currentPage.value = val;
  router.replace({
    name: "catalog-id",
    query: {
      page: currentPage.value != 1 ? currentPage.value : undefined,
    },
  });
  refresh();
};
</script>

<template>
  <div class="bd-docs-main">
    <div class="container is-max-desktop">
      <div class="content">
        <!-- <Breadcrumb />
        <nav-category /> -->
        <div class="columns is-max-desktop is-multiline is-variable is-5">
          <div v-if="project.result != ''">
            <div
              class="column is-4"
              v-for="item in project.result"
              :key="item._id"
            >
              <div class="catalog-block">
                <nuxt-link :to="`/course/` + item.kirilica">
                  <div class="catalog-block-img">
                    <NuxtImg
                      v-for="imgurl in item.img"
                      :key="imgurl"
                      :src="imgurl.url"
                      loading="lazy"
                      format="wepb"
                    />
                  </div>
                  <div class="catalog-block-desc">
                    <strong>
                      {{ item.title }}
                    </strong>
                    <span>
                      {{ item.preview }}
                    </span>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div v-else>no course</div>
        </div>
        <el-pagination
          class="pagination-list"
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="project.count"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
