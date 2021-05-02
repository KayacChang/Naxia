import { useState, useEffect } from "react";
import { Loader, ILoaderResource } from "pixi.js";
import { Resource } from "resource-loader";
import { SpineParser } from "@pixi-spine/loader-3.8";
export { SpineParser };
export * from "@pixi-spine/runtime-3.8";
export * from "@pixi-spine/base";

SpineParser.registerLoaderPlugin();

export type Tasks = { name: string; url: string }[];
export type Assets = Record<string, ReturnType<typeof mapping>>;
type LoadFunc = (tasks: Tasks) => Promise<Assets>;

const loader = Loader.shared;

function mapping(res: ILoaderResource) {
  if (res.type === Resource.TYPE.IMAGE && res.texture) {
    return res.texture;
  }

  if (res.type === Resource.TYPE.JSON && res.spritesheet) {
    return res.spritesheet;
  }

  // for spine
  if (res.type === Resource.TYPE.JSON && res.spineData) {
    return res.spineData;
  }
  if (res.type === Resource.TYPE.TEXT && res.extension === "atlas") {
    return res.data;
  }

  if (res.type === Resource.TYPE.TEXT && res.extension === "fnt") {
    return res.data;
  }

  console.log(res);

  throw new Error(
    `Can't load [${res.name} / ${res.url}]: not support this resource type.`
  );
}

function mapToResources(resources: Record<string, Resource>): Assets {
  return Object.entries(resources).reduce(
    (obj, [name, res]) => ({ ...obj, [name]: mapping(res) }),
    {}
  );
}

const load: LoadFunc = (tasks: Tasks) => {
  return new Promise((resolve) => {
    loader
      .add(tasks)
      .load((_, resources) =>
        resolve(mapToResources(resources as Record<string, Resource>))
      );
  });
};

function hasLoaded(name: string) {
  return name in loader.resources;
}

let resources = mapToResources(loader.resources);

export function useAssets(tasks: Tasks) {
  const [isCompleted, setCompleted] = useState(
    () => tasks.filter(({ name }) => !hasLoaded(name)).length <= 0
  );

  useEffect(() => {
    if (isCompleted) return;

    const newTasks = tasks.filter(({ name }) => !hasLoaded(name));

    load(newTasks).then((res) => {
      resources = res;

      setCompleted(true);
    });
  }, [isCompleted, tasks]);

  return { resources, isCompleted };
}
