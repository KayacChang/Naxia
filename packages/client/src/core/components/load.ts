import { IResourceDictionary, Loader, LoaderResource, utils } from "pixi.js";

function mapping(res: LoaderResource) {
  if (res.type === LoaderResource.TYPE.IMAGE && res.texture) {
    return res.texture;
  }

  if (res.type === LoaderResource.TYPE.JSON && res.spritesheet) {
    return res.spritesheet;
  }

  throw new Error(
    `Can't load [${res.name} / ${res.url}]: not support this resource type.`,
  );
}

export type ResourceMap = Record<string, ReturnType<typeof mapping>>;

function mapToResources(resources: IResourceDictionary): ResourceMap {
  return Object.entries(resources).reduce(
    (obj, [name, res]) => ({ ...obj, [name]: mapping(res) }),
    {},
  );
}

interface EventMap {
  error: (msg: string) => void;
  complete: (resources: ResourceMap) => void;
  progress: (progress: number) => void;
}

export function hasLoaded(task: string) {
  const { BaseTextureCache, TextureCache, ProgramCache } = utils;

  return (
    task in BaseTextureCache || task in TextureCache || task in ProgramCache
  );
}

export function getResources() {
  return mapToResources(Loader.shared.resources);
}

export function load(tasks: string[]) {
  const loader = Loader.shared;

  const handlers: {
    [K in keyof EventMap]: EventMap[K][];
  } = {
    error: [],
    progress: [],
    complete: [],
  };

  loader.add(tasks);

  loader.onError.once((msg: string) =>
    handlers.error.forEach((handle) => handle(msg))
  );

  loader.onProgress.add((progress: number) =>
    handlers.progress.forEach((handle) => handle(progress))
  );

  loader.load(() =>
    handlers.complete.forEach((handle) => handle(getResources()))
  );

  return {
    on<K extends keyof EventMap>(event: K, handle: EventMap[K]) {
      if (event === "error") {
        handlers.error.push(handle as EventMap["error"]);
      }

      if (event === "progress") {
        handlers.progress.push(handle as EventMap["progress"]);
      }

      if (event === "complete") {
        handlers.complete.push(handle as EventMap["complete"]);
      }

      return this;
    },
  };
}
