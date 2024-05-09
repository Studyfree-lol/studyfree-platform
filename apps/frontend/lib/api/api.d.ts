/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/universities": {
    /**
     * Get all Universities
     * @description retrieve all universities
     */
    get: {
      parameters: {
        query?: {
          search?: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["model.UniversityPreview"][];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
          };
        };
        /** @description Not Found */
        404: {
          content: {
          };
        };
        /** @description Internal Server Error */
        500: {
          content: {
          };
        };
      };
    };
  };
  "/universities/{universityId}": {
    /**
     * Get specific University
     * @description retrieve meta data for a university including courses
     */
    get: {
      parameters: {
        path: {
          universityId: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["model.UniversityPreview"];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
          };
        };
        /** @description Not Found */
        404: {
          content: {
          };
        };
        /** @description Internal Server Error */
        500: {
          content: {
          };
        };
      };
    };
  };
  "/courses/{courseId}/documents": {
    /**
     * Get specific Document
     * @description retrieve a meta information about a specific document
     */
    get: {
      parameters: {
        path: {
          courseId: string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["model.Document"][];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
          };
        };
        /** @description Not Found */
        404: {
          content: {
          };
        };
        /** @description Internal Server Error */
        500: {
          content: {
          };
        };
      };
    };
    /**
     * Push a new Document
     * @description Push a new document to the courses
     */
    post: {
      parameters: {
        query: {
          name: string;
          tag: "exam" | "notes" | "slides" | "exercise";
        };
        path: {
          courseId: string;
        };
      };
      requestBody?: {
        content: {
          "application/pdf": string;
        };
      };
      responses: {
        /** @description OK */
        200: {
          content: {
            "application/json": components["schemas"]["model.Document"][];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
          };
        };
        /** @description Not Found */
        404: {
          content: {
          };
        };
        /** @description Internal Server Error */
        500: {
          content: {
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    "model.UniversityPreview": {
      /** Format: uuid */
      id: string;
      title: string;
    };
    "model.University": components["schemas"]["model.UniversityPreview"] & {
      courses: components["schemas"]["model.CoursePreview"][];
    };
    "model.CoursePreview": {
      /** Format: uuid */
      id: string;
      title: string;
    };
    "model.Course": components["schemas"]["model.CoursePreview"] & {
      documents: components["schemas"]["model.Document"][];
    };
    "model.Document": {
      /** Format: uuid */
      id: string;
      title: string;
      fileUrl: string;
      thumbUrl: string;
      tag: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
