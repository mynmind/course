import CoursesModel from "~/server/models/Courses";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);

    if (data.ParamsCat) {
      const filterArr = data.FilterArr;

      const selectedFiltersByType = {};
      const combinedFiltersByType = {};

      // Заполнение объектов выбранными и объединенными значениями фильтра
      data.filter.forEach((selectedFilter) => {
        filterArr.forEach(({ type, kirilica }) => {
          if (selectedFilter === kirilica) {
            selectedFiltersByType[type] =
              selectedFiltersByType[type] || new Set();
            selectedFiltersByType[type].add(kirilica);

            combinedFiltersByType[type] =
              combinedFiltersByType[type] || new Set();
            combinedFiltersByType[type].add(selectedFilter);
          }
        });
      });

      const arrayCond = Object.entries(combinedFiltersByType).map(
        ([type, values]) => ({
          type,
          kirilica: { $in: Array.from(values) },
        })
      );

      const objfill =
        arrayCond.length > 0
          ? {
              category: data.ParamsCat,
              $and: arrayCond.map((condition) => ({
                filter: { $elemMatch: condition },
              })),
            }
          : { category: data.ParamsCat };

      const result = await CoursesModel.find(objfill)
        .skip(data.sortPage)
        .limit(data.pageSize);

      const count = await CoursesModel.countDocuments(objfill);

      return { result, count };
    }

    if (data.ParamsCatChild) {
      const filterArr = data.FilterArr;

      const selectedFiltersByType = {};
      const combinedFiltersByType = {};

      // Заполнение объектов выбранными и объединенными значениями фильтра
      data.filter.forEach((selectedFilter) => {
        filterArr.forEach(({ type, kirilica }) => {
          if (selectedFilter === kirilica) {
            selectedFiltersByType[type] =
              selectedFiltersByType[type] || new Set();
            selectedFiltersByType[type].add(kirilica);

            combinedFiltersByType[type] =
              combinedFiltersByType[type] || new Set();
            combinedFiltersByType[type].add(selectedFilter);
          }
        });
      });

      const arrayCond = Object.entries(combinedFiltersByType).map(
        ([type, values]) => ({
          type,
          kirilica: { $in: Array.from(values) },
        })
      );

      const objfill =
        arrayCond.length > 0
          ? {
              categorychild: data.ParamsCatChild,
              $and: arrayCond.map((condition) => ({
                filter: { $elemMatch: condition },
              })),
            }
          : { categorychild: data.ParamsCatChild };

      const result = await CoursesModel.find(objfill)
        .skip(data.sortPage)
        .limit(data.pageSize);

      const count = await CoursesModel.countDocuments(objfill);

      return { result, count };
    }

    if (data != undefined && !data.ParamsCat) {
      const result = await CoursesModel.find()
        .skip(data.sortPage)
        .limit(data.pageSize);
      const count = await CoursesModel.find().count();
      return { result, count };
    } else {
      const result = await CoursesModel.find();
      return result;
    }
  } catch (err) {
    console.log(err);
  }
});
