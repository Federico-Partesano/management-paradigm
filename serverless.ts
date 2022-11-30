import type { Serverless } from "serverless/aws";
const projectName = "peoples";
const accountId = "477918702832";
const region = "eu-west-1";
const layerName = "serverLayer";
const runtime = "nodejs16.x";
const config =
  process.env.NODE_ENV === "production"
    ? {
        db: "prod",
        env: "Prod",
        layerEnv: "Production",
        version: "1",
      }
    : {
        db: "stage",
        env: "Stage",
        layerEnv: "Stage",
        version: "3",
      };

const serverlessConfiguration: Serverless =
  process.env.DEPLOY === "functions"
    ? {
        service: {
          name: projectName,
        },
        frameworkVersion: "2",
        custom: {
          webpack: {
            packager: "npm",
            webpackConfig: "./webpack.config.js",
            keepOutputDirectory: true,
          },
        },

        plugins: [
          "serverless-webpack",
          "serverless-offline",
          "serverless-dotenv-plugin",
        ],
        provider: {
          name: "aws",
          runtime,
          region,
          iamRoleStatements: [
            { Effect: "Allow", Action: "lambda:*", Resource: "*" },
          ],
        },

        functions: {
          lambda: {
            handler: "lambda.handler",
            timeout: 600,
            layers: [
              `arn:aws:lambda:${region}:${accountId}:layer:${layerName}${config.env}:${config.version}`,
            ],
            events: [
              {
                http: {
                  method: "any",
                  path: "/{proxy+}",
                },
              },
            ],
          },
        },
      }
    : {
        service: `${projectName}-modules-layer-stack`,
        package: {
          exclude: ["nodejs/package.json", "nodejs/package-lock.json"],
        },
        frameworkVersion: "2",
        provider: {
          name: "aws",
          runtime,
          region,
        },
        layers:
          config.layerEnv === "Production"
            ? {
                serverLayerProd: {
                  path: "layer",
                  name: `${layerName}Prod`,
                  description: `${projectName} node modules layer`,
                },
              }
            : {
                serverLayerStage: {
                  path: "layer",
                  name: `${layerName}Stage`,
                  description: `${projectName} node modules layer`,
                },
              },
      };

module.exports = serverlessConfiguration;
