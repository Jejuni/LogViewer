import { Injectable } from '@angular/core';
import { TreeNode } from '../Models/TreeNode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeParserService {

  constructor() { }

  /**
   * Takes a valid JSON string and transforms it into a Treeview model, intended to be used with a tree view.
   * @param obj The object from which to build the tree. Has to be a valid JSON object. Escaping of the '\' character is handled internally.
   */
  public buildTreeFromStringifiedObject(obj: string): Observable<TreeNode[]> {
    let parsedObj;
    try {
       parsedObj = JSON.parse(obj);
    } catch (e) {
      throw new Error(`Given JSON was not able to be parsed. Given error was: [${e}]`);
    }

    return of(this.buildUpTree(parsedObj, 0));
  }

  private buildUpTree(obj: {[key: string]: any}, level: number): TreeNode[] {
    return Object.keys(obj).reduce<TreeNode[]>((acc, key) => {
      const value = obj[key];
      const node = new TreeNode();
      node.displayName = key;

      if (!!value) {
        if (typeof value === 'object') {
          node.children = this.buildUpTree(value, level + 1);
        } else {
          node.potentialValue = value;
        }
      }

      return acc.concat(node);
    }, []);
  }
}
