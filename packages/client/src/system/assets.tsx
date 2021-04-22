import { useState, useEffect } from "react";
import { Loader, LoaderResource } from "pixi.js";
import "pixi-spine";

export type Tasks = { name: string; url: string }[];
export type Assets = Record<string, ReturnType<typeof mapping>>;
type LoadFunc = (tasks: Tasks) => Promise<Assets>;

const loader = Loader.shared;

function mapping(res: LoaderResource) {
  if (res.type === LoaderResource.TYPE.IMAGE && res.texture) {
    return res.texture;
  }

  if (res.type === LoaderResource.TYPE.JSON && res.spritesheet) {
    return res.spritesheet;
  }

  // for spine
  if (res.type === LoaderResource.TYPE.JSON && res.spineData) {
    return res.spineData;
  }
  if (res.type === LoaderResource.TYPE.TEXT && res.extension === "atlas") {
    return res.data;
  }

  console.log(res);

  throw new Error(
    `Can't load [${res.name} / ${res.url}]: not support this resource type.`
  );
}

function mapToResources(resources: Record<string, LoaderResource>): Assets {
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
        resolve(mapToResources(resources as Record<string, LoaderResource>))
      );
  });
};

function hasLoaded(name: string) {
  return name in loader.resources;
}

export function useAssets(tasks: Tasks) {
  const [isCompleted, setCompleted] = useState(
    () => tasks.filter(({ name }) => !hasLoaded(name)).length <= 0
  );
  const [resources, setResources] = useState(() =>
    mapToResources(loader.resources)
  );

  useEffect(() => {
    if (isCompleted) return;

    const newTasks = tasks.filter(({ name }) => !hasLoaded(name));

    load(newTasks).then((resources) => {
      setResources(resources);
      setCompleted(true);
    });
  }, [isCompleted, tasks]);

  return { resources, isCompleted };
}
