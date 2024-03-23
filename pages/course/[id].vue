<script setup>
const route = useRoute();
const statusUser = ref(false);
const isTextVisible = ref(false);
const { data: user } = useAuth();

if (user.value) {
  const { data: userData } = await useFetch(() => "/api/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: user.value.user._id,
  });
  statusUser.value = userData.value[0][0].status;
} else {
  statusUser.value = false;
}

const { data: course } = useFetch(() => "/api/course/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  body: route.params.id,
});

const toggleText = () => {
  isTextVisible.value = !isTextVisible.value;
};
</script>

<template>
  <div>
    <div class="bd-docs-main">
      <div class="container is-max-desktop">
        <div v-for="item in course" :key="item">
          <div class="content">
            <div class="breadcrumb-catalog">
              <Breadcrumb
                :courseCategory="item.category"
                :courseCategorychild="item.categorychild"
                :courseName="item.title"
                :courseLink="item.kirilica"
              />
            </div>
            <div class="back" @click="$router.back()">
              <Icon name="solar:round-alt-arrow-left-broken" />
              <strong>Назад</strong>
            </div>
            <h1 class="h1-project">{{ item.title }}</h1>
            <div class="cours-star">
              <el-rate
                v-model="item.raiting"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              />
            </div>
            <div class="course-block">
              <div class="course-item">
                {{ item.preview }}
              </div>
              <div class="course-full">
                <div class="course-full-info">
                  <Icon name="solar:hourglass-broken" />
                  <div class="course-full-info-text">
                    <strong>Продолжительность</strong>
                    <span>{{ item.duration }}</span>
                  </div>
                </div>
                <div class="course-full-info">
                  <Icon name="solar:checklist-minimalistic-broken" />
                  <div class="course-full-info-text">
                    <strong>Количество уроков</strong>
                    <span>{{ item.number_of_lessons }}</span>
                  </div>
                </div>
                <div class="course-full-info">
                  <Icon name="solar:calendar-broken" />
                  <div class="course-full-info-text">
                    <strong>Дата выхода</strong>
                    <span>{{ item.release_date }}</span>
                  </div>
                </div>
                <div class="course-full-info">
                  <Icon name="solar:earth-broken" />
                  <div class="course-full-info-text">
                    <strong>Язык</strong>
                    <span>{{ item.language }}</span>
                  </div>
                </div>
              </div>
              <div class="project-video">
                <CourseVideo :namecourse="item.kirilica" :status="statusUser" />
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">
                <div class="project-block-desc">
                  <transition name="el-fade-in-linear">
                    <div
                      v-html="item.description"
                      :style="{
                        maxHeight: isTextVisible ? 'none' : '170px',
                        overflow: isTextVisible ? 'visible' : 'hidden',
                      }"
                      class="description-course"
                    ></div>
                  </transition>
                  <button class="button" @click="toggleText">
                    {{ isTextVisible ? "Скрыть текст" : "Показать текст" }}
                  </button>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">
                <CourseComment />
              </div>
            </div>
            <!-- <ProjectReviews v-model:params="route.params.id" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.description {
  max-height: 200px;
  overflow: hidden;
  transition: max-height 0.5s ease; /* добавляем анимацию */
}

.el-fade-in-linear-enter-active,
.el-fade-in-linear-leave-active {
  transition: opacity 0.5s;
}

.el-fade-in-linear-enter,
.el-fade-in-linear-leave-to {
  opacity: 0;
}
</style>
