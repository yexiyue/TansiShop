import { axios } from "./index";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return (
    await axios.post("/clothe/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};

export interface Clothe {
  id: number;
  name: string;
  articleNo: string;
  frontImg: string;
  backImg: string;
  publish: boolean;
  banners: any[];
  price: number;
  category: string;
  fabric: string;
  colorCount: { color: string; count: number }[];
  createTime: string;
}

export const createClothe = async (data: Partial<Clothe>) => {
  return (await axios.post("/clothe", data)).data;
};

export const getClothes = async (
  take: number,
  skip: number,
  publish: boolean = false
) => {
  const order = localStorage.getItem("order") ?? "false";
  return (
    await axios.get(
      `/clothe?take=${take}&skip=${skip}&publish=${publish}&order=${order}`
    )
  ).data;
};

export const getCount = async (publish: boolean = false) => {
  return (await axios.get(`/clothe/count?publish=${publish}`)).data;
};

export const getClotheDetail = async (id: string) => {
  return (await axios.get("/clothe/" + id)).data;
};

export const updateClothe = async (id: string, data: Partial<Clothe>) => {
  return (await axios.patch("/clothe/" + id, data)).data;
};

export const updatePublish = async (id: string, publish: boolean) => {
  return (
    await axios.patch("/clothe/publish/" + id, {
      publish,
    })
  ).data;
};

export const deleteClothe = async (id: string) => {
  return (await axios.delete("/clothe/" + id)).data;
};

export const getClothesByCategory = async (
  take: number,
  skip: number,
  publish: boolean = false,
  category: string = ""
) => {
  const order = localStorage.getItem("order") ?? "false";
  return (
    await axios.get(
      `/clothe/list?take=${take}&skip=${skip}&publish=${publish}&order=${order}&category=${category}`
    )
  ).data;
};

export const getCountByCategory = async (
  category: string,
  publish: boolean = true
) => {
  return (
    await axios.get(
      `/clothe/list/count?publish=${publish}&category=${category}`
    )
  ).data;
};

export const getFavoriteList = async (data: number[]) => {
  return (
    await axios.post(`/clothe/favorite`, {
      list: data,
    })
  ).data;
};
