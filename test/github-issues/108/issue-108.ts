import "reflect-metadata";
import { createTestingConnections, closeTestingConnections, reloadTestingDatabases } from "../../utils/test-utils";
import { Connection } from "../../../src/connection/Connection";
import { Project } from "./entity/Project";
import { User } from "./entity/User";
import { expect } from "chai";

describe("github issues > #108 Error with constraint names on postgres", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchemaOnConnection: true,        
    }));
    after(() => closeTestingConnections(connections));

    it("should sync even when there unqiue constraints placed on similarly named columns", () => Promise.all(connections.map(async connection => {        
       // By virtue that we got here means that it must have worked.
       expect(true).is.true;
    })));

});