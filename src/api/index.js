//lấy data chi tiết của 1 phim dựa vào slug
export const fetchMovieDetail = async (slug) => {
  try {
    const response = await fetch(`https://phimapi.com/phim/${slug}`);
    if (!response.ok) {
      throw new Error("Địa chỉ api không hợp lệ:", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dữ liệu không hợp lệ:", error);
  }
};

// lấy data phim mới cập nhật
export const fetchNewMovies = async (number) => {
  try {
    const response = await fetch(
      `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v2?limit=${number}`
    );
    if (!response.ok) {
      throw new Error("Địa chỉ api không hợp lệ:", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dữ liệu không hợp lệ:", error);
  }
};

//lấy data phim lẻ
export const fetchFeature = async (number) => {
  try {
    const response = await fetch(
      `https://phimapi.com/v1/api/danh-sach/phim-le?limit=${number}`
    );
    if (!response.ok) {
      throw new Error("Địa chỉ api không hợp lệ:", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dữ liệu không hợp lệ:", error);
  }
};

//lấy data tv-shows
export const fetchTvShows = async (number) => {
  try {
    const response = await fetch(
      `https://phimapi.com/v1/api/danh-sach/tv-shows?limit=${number}`
    );
    if (!response.ok) {
      throw new Error("Địa chỉ api không hợp lệ:", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dữ liệu không hợp lệ:", error);
  }
};
//lấy data phim bộ
export const fetchSeries = async (number) => {
  try {
    const response = await fetch(
      `https://phimapi.com/v1/api/danh-sach/phim-bo?limit=${number}`
    );
    if (!response.ok) {
      throw new Error("Địa chỉ api không hợp lệ:", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dữ liệu không hợp lệ:", error);
  }
};

//lấy data phim hoạt hình
export const fetchCartoon = async (number) => {
  try {
    const response = await fetch(
      `https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=${number}`
    );
    if (!response.ok) {
      throw new Error("Địa chỉ api không hợp lệ:", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dữ liệu không hợp lệ:", error);
  }
};

//lấy data theo năm
export const fetchYear = async (year) => {
  try {
    const response = await fetch(`https://phimapi.com/v1/api/nam/${year}`);
    if (!response.ok) {
      throw new Error("Địa chỉ api không hợp lệ:", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dữ liệu không hợp lệ:", error);
  }
};

//lấy data theo thể loại
export const fetchGenre = async (genre) => {
  try {
    const response = await fetch(
      `https://phimapi.com/v1/api/the-loai/${genre}?limit=${60}`
    );
    if (!response.ok) {
      throw new Error("Địa chỉ api không hợp lệ:", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dữ liệu không hợp lệ:", error);
  }
};

//lấy data theo quốc gia
export const fetchCountry = async (country) => {
  try {
    const response = await fetch(
      `https://phimapi.com/v1/api/quoc-gia/${country}?limit=${60}`
    );
    if (!response.ok) {
      throw new Error("Địa chỉ api không hợp lệ:", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Dữ liệu không hợp lệ:", error);
  }
};
