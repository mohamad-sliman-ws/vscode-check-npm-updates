/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
var assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
var packageVersions = require('../packageVersions');

// Defines a Mocha test suite to group tests of similar kind together
suite("Package Versions Tests", function () {

    // Defines a Mocha unit test
    test("Extract Current Package Versions. No packages", function () {

        const packageFileJson = {
        }

        const packageLockFileJson = {
        }

        var packages = packageVersions.extractCurrentPackageVersions({ packageFileJson, packageLockFileJson });

        assert.equal(0, packages.length);
    });

    // Defines a Mocha unit test
    test("Extract Current Package Versions. Many packages", function () {

        const packageFileJson = {
            "dependencies": {
                "pack1": "^1.0.0",
                "pack2": "^2.0.0",
            },
            "devDependencies": {
                "pack3": "^3.0.0",
                "pack4": "^4.0.0"
            }
        }

        const packageLockFileJson = {
            "dependencies": {
                "pack1": { version: "1.0.1" },
                "pack2": { version: "2.0.2" },
                "pack3": { version: "3.0.3" }
            }
        }

        var packages = packageVersions.extractCurrentPackageVersions({ packageFileJson, packageLockFileJson });

        assert.equal(4, packages.length);

        assert.equal("pack1", packages[0].packageName);
        assert.equal("^1.0.0", packages[0].requestedVersion);
        assert.equal("1.0.1", packages[0].installedVersion);

        assert.equal("pack2", packages[1].packageName);
        assert.equal("^2.0.0", packages[1].requestedVersion);
        assert.equal("2.0.2", packages[1].installedVersion);

        assert.equal("pack3", packages[2].packageName);
        assert.equal("^3.0.0", packages[2].requestedVersion);
        assert.equal("3.0.3", packages[2].installedVersion);

        assert.equal("pack4", packages[3].packageName);
        assert.equal("^4.0.0", packages[3].requestedVersion);
        assert.equal(undefined, packages[3].installedVersion);
    });

    // Defines a Mocha unit test
    test("Get Required Updates", function () {
        
                const packages = [
                    {
                        packageName: "pack1",
                        requestedVersion: "^1.0.0",
                        installedVersion: "1.0.1",
                        availableVersions: [ "1.0.0", "1.0.1" ]
                    },
                    {
                        packageName: "pack2",
                        requestedVersion: "^2.0.0",
                        installedVersion: "2.0.2",
                        availableVersions: [ "2.0.0", "2.0.1", "2.0.2", "2.0.3" ]
                    },
                    {
                        packageName: "pack3",
                        requestedVersion: "^3.0.0",
                        installedVersion: "3.0.3",
                    },
                    {
                        packageName: "pack4",
                        requestedVersion: "^4.0.0",
                        availableVersions: [ "4.0.0", "4.0.1" ]
                    },
                    {
                        packageName: "pack5",
                        requestedVersion: "^5.0.0"
                    }
                ]
        
                var packagesToUpdate = packageVersions.getRequiredUpdates(packages);
        
                assert.equal(2, packagesToUpdate.length);
                assert.equal("pack2", packagesToUpdate[0]);
                assert.equal("pack4", packagesToUpdate[1]);
            });
        });