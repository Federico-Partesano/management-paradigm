import type { Serverless } from "serverless/aws";
const projectName = "managerial-paradigma";
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
        version: "2",
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
          vpc: {
            securityGroupIds: ["sg-0969dc0e0b6350be9"],
            subnetIds: ["subnet-03d4051c17d431e91", "subnet-0020501e7da89bcfd"],
          },
          runtime,
          region,
          iamRoleStatements: [
            { Effect: "Allow", Action: "lambda:*", Resource: "*" },
          ],
        },

        functions: {
          lambda: {
            handler: "lambda.handler",
            vpc: {
              securityGroupIds: ["sg-0969dc0e0b6350be9"],
              subnetIds: ["subnet-03d4051c17d431e91", "subnet-0020501e7da89bcfd"],
            },
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
